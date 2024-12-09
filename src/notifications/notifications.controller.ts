import { Controller, Post, Body, Get, BadRequestException } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('/subscribe')
addSubscription(@Body() subscription: any) {
  if (!subscription || !subscription.endpoint) {
    throw new BadRequestException('Invalid subscription object. Endpoint is required.');
  }
  this.notificationsService.addSubscription(subscription);
  return { message: 'Subscription added successfully.' };
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
