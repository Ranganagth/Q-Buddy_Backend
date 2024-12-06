import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { webPushConfig } from 'src/config/configuration';
import * as webPush from 'web-push';

@Injectable()
export class NotificationsService {
  private subscriptions: any[] = [];

  constructor() {
    webPush.setVapidDetails(
      webPushConfig.email,
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
  }

  addSubscription(subscription: any) {
    this.subscriptions.push(subscription);
    console.log(`New subscription added: ${subscription.endpoint}`);
  
    // Send a confirmation notification to the subscriber
    const payload = JSON.stringify({
      title: 'Subscription Successful!',
      body: 'You are now subscribed to notifications. 🎉',
      icon: '/icon.png',
    });
  
    this.sendNotification(subscription, payload).catch((error) =>
      console.error('Error sending confirmation notification:', error.message),
    );
  }

  private removeSubscription(subscription: any) {
    this.subscriptions = this.subscriptions.filter(
      (sub) => sub.endpoint !== subscription.endpoint,
    );
    console.log(`Subscription removed: ${subscription.endpoint}`);
  }

  private async sendNotification(subscription: any, payload: string) {
    try {
      await webPush.sendNotification(subscription, payload);
      console.log(`Notification sent to: ${subscription.endpoint}`);
    } catch (error) {
      console.error('Error sending notification:', error.message);
      if (error.statusCode === 410) {
        console.error(
          `Subscription expired or invalid, removing: ${subscription.endpoint}`
        );
        this.removeSubscription(subscription);
      }
    }
  }

  public async sendNotificationToAll(payload: string) {
    if (this.subscriptions.length === 0) {
      console.error('No subscriptions available. Cannot send notifications.');
      return;
    }

    for (const subscription of this.subscriptions) {
      console.log('Sending notification to:', subscription.endpoint);
      await this.sendNotification(subscription, payload);
    }
  }

  public getSubscriptions(): any[] {
    return this.subscriptions;
  }

  // Scheduled Notifications
  @Cron('11 11 * * *') // Runs at 11:00 AM daily
  async sendMorningNotification() {
    console.log('Sending morning notification at:', new Date().toISOString());
    const payload = JSON.stringify({
      title: 'Good Morning!',
      body: 'Feeling lucky today?',
      icon: '/icon.png',
    });
    await this.sendNotificationToAll(payload);
  }

  @Cron('11 23 * * *') // Runs at 11:00 PM daily
  async sendNightNotification() {
    console.log('Sending night notification at:', new Date().toISOString());
    const payload = JSON.stringify({
      title: 'Good Night!',
      body: 'Sweet dreams! 🌙',
      icon: '/icon.png',
    });
    await this.sendNotificationToAll(payload);
  }

  // Random Notifications
  @Cron(CronExpression.EVERY_HOUR) // Modify as needed for random frequency
  async sendRandomNotification() {
    const randomMessages = [
      "You're doing amazing, keep it up!",
      "Life is short, smile while you still have teeth!",
      "You miss 100% of the shots you don't take!",
      "Feeling lucky today?",
    ];

    const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    console.log('Sending random notification:', message);

    const payload = JSON.stringify({
      title: 'Surprise Message!',
      body: message,
      icon: '/icon.png',
    });

    await this.sendNotificationToAll(payload);
  }
}
