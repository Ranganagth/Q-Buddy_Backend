import { Controller, Post, Body, Get, BadRequestException } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Post('/subscribe')
  addSubscription(@Body() subscription: any) {
    if (!subscription || !subscription.endpoint) {
      throw new BadRequestException('Invalid subscription object. Endpoint is required.');
    }
    this.notificationsService.addSubscription(subscription); // Pass the subscription object to the service
    return { message: 'Subscription added successfully.' };
  }

  @Post('/test-notification')
  async testNotification(@Body() payload: any) {
    console.log('Testing notification with payload:', payload);
    await this.notificationsService.sendNotificationToAll(JSON.stringify(payload));
  }  

  @Post('/broadcast')
  async broadcastNotification(@Body('payload') payload: string) {
    await this.notificationsService.sendNotificationToAll(payload);
    return { message: 'Notifications sent to all subscribers.' };
  }

  @Get('/subscriptions')
  getSubscriptions() {
    return this.notificationsService.getSubscriptions();
  }
}
