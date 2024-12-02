import { Injectable, OnModuleInit } from '@nestjs/common';
import * as webPush from 'web-push';
import { webPushConfig } from '../config/configuration';
import * as cron from 'node-cron';

webPush.setVapidDetails(
  webPushConfig.email,
  webPushConfig.publicKey,
  webPushConfig.privateKey
);

@Injectable()
export class NotificationsService implements OnModuleInit {
  private subscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/codVsNcRx54:APA91bEUK8Z5oXlfcoIlXFiZCK1D1ktCkyT4cDwHuZgRvp_VVuZSKWi-7ioytWbs8shByZVoTxbdvTaoAt2Uq9mXEqE8hIyVUo045ZHXNIWlJ9E9gXwFPuCucHGQUmWCYsQWchT5R6v7',
    keys: {
      p256dh: 'BOPMZzuw-RPZev82f_bwOujVE7HQOCwhWiISKXwLe43LU5iCN178R5Wqk9lAm4QZkN4bmuS9CPh6IXCfW8JpPHk',
      auth: 't6nCq0P0MMTpeg_q75xNqg',
    },
  };

  // Initialize notification logic
  onModuleInit() {
    // // Send notifications every 10 seconds
    // setInterval(() => {
    //   this.sendNotificationEvery10Seconds();
    // }, 10000); // 10000ms = 10 seconds

    // Schedule a notification to be sent every day at 9:00 AM
    cron.schedule('0 9 * * *', () => { // The cron syntax is * * * * * (minute, hour, day of month, month, day of week). '0 9 * * *' means at 9 AM every day
      this.sendNotificationAtScheduledTime();
    });
  }

  private sendNotificationEvery10Seconds() {
    const payload = JSON.stringify({
      title: '🎉 Special Deal Just For You!',
      body: 'Check out our exciting new offer! Limited time only.',
      icon: '/icon.png',
      badge: '/badge.png',
      image: 'https://yourwebsite.com/promo-image.jpg',
      url: 'https://yourwebsite.com/special-offer',
      actions: [
        {
          action: 'view_offer',
          title: 'View Offer',
          icon: 'https://yourwebsite.com/view-icon.png',
        },
        {
          action: 'dismiss',
          title: 'Dismiss',
          icon: 'https://yourwebsite.com/dismiss-icon.png',
        },
      ],
      vibrate: [200, 100, 200],
      requireInteraction: true,
      timestamp: Date.now(),
      priority: 'high',
      tag: 'special-offer',
    });

    this.sendNotification(this.subscription, payload)
      .then(response => {
        console.log('Push notification sent every 10 seconds successfully:', response);
      })
      .catch(error => {
        console.error('Error sending push notification:', error);
      });
  }

  private sendNotificationAtScheduledTime() {
    const payload = JSON.stringify({
      title: 'Scheduled Notification!',
      body: 'This notification is sent every day at 9:00 AM.',
      icon: '/icon.png',
      url: 'https://yourwebsite.com',
    });

    this.sendNotification(this.subscription, payload)
      .then(response => {
        console.log('Scheduled notification sent successfully:', response);
      })
      .catch(error => {
        console.error('Error sending scheduled push notification:', error);
      });
  }

  sendNotification(subscription: any, payload: string) {
    return webPush.sendNotification(subscription, payload).catch(err => {
      console.error('Error sending notification', err);
    });
  }
}
