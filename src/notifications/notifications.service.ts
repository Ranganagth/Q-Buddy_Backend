import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { webPushConfig } from 'src/config/configuration';
import * as webPush from 'web-push';

webPush.setVapidDetails(
  webPushConfig.email,
  webPushConfig.publicKey,
  webPushConfig.privateKey
);

@Injectable()
export class NotificationsService {
  private subscriptions: any[] = [];

  addSubscription(subscription: any) {
    this.subscriptions.push(subscription);
    console.log(`New subscription added: ${subscription.endpoint}`);
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

  // Cron Job for periodic notifications
  @Cron('*/10 * * * * *') // Runs every 10 seconds
async handleCron() {
  console.log('Cron job executed at:', new Date().toISOString());
  const payload = 'Periodic notification payload';
  await this.sendNotificationToAll(payload);
}

}
