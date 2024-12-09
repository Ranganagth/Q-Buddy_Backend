import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    addSubscription(subscription: any): {
        message: string;
    };
    broadcastNotification(payload: string): Promise<{
        message: string;
    }>;
    getSubscriptions(): any[];
}
