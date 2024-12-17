export declare class NotificationsService {
    private subscriptions;
    addSubscription(subscription: any): void;
    private removeSubscription;
    private sendNotification;
    sendNotificationToAll(payload: string): Promise<void>;
    getSubscriptions(): any[];
}
