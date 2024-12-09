"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const configuration_1 = require("../config/configuration");
const webPush = require("web-push");
webPush.setVapidDetails(configuration_1.webPushConfig.email, configuration_1.webPushConfig.publicKey, configuration_1.webPushConfig.privateKey);
let NotificationsService = class NotificationsService {
    constructor() {
        this.subscriptions = [];
    }
    addSubscription(subscription) {
        this.subscriptions.push(subscription);
        console.log(`New subscription added: ${subscription.endpoint}`);
    }
    removeSubscription(subscription) {
        this.subscriptions = this.subscriptions.filter((sub) => sub.endpoint !== subscription.endpoint);
        console.log(`Subscription removed: ${subscription.endpoint}`);
    }
    async sendNotification(subscription, payload) {
        try {
            await webPush.sendNotification(subscription, payload);
            console.log(`Notification sent to: ${subscription.endpoint}`);
        }
        catch (error) {
            console.error('Error sending notification:', error.message);
            if (error.statusCode === 410) {
                console.error(`Subscription expired or invalid, removing: ${subscription.endpoint}`);
                this.removeSubscription(subscription);
            }
        }
    }
    async sendNotificationToAll(payload) {
        if (this.subscriptions.length === 0) {
            console.error('No subscriptions available. Cannot send notifications.');
            return;
        }
        for (const subscription of this.subscriptions) {
            console.log('Sending notification to:', subscription.endpoint);
            await this.sendNotification(subscription, payload);
        }
    }
    getSubscriptions() {
        return this.subscriptions;
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)()
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map