import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('subscribe')
  subscribe(@Body() subscription: any) {
    console.log('Subscription received:', subscription);
    // Save subscription to a database (optional)
    return { message: 'Subscription received' };
  }

  @Post('send')
  sendNotification(@Body() { subscription, message }: any) {
    console.log('Sending notification to:', message.subscription.endpoint);
    return { message: 'Notification sent!' };
  }
}
