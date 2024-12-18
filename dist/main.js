"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const webPush = require("web-push");
const constants_1 = require("./config/constants");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: constants_1.APP_CONFIG.CORS_ORIGINS,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Content-Type, Accept, Authorization'
    });
    await app.listen(3000);
}
webPush.setVapidDetails(constants_1.APP_CONFIG.WEB_PUSH.CONTACT_EMAIL, constants_1.APP_CONFIG.WEB_PUSH.PUBLIC_KEY, constants_1.APP_CONFIG.WEB_PUSH.PRIVATE_KEY);
bootstrap();
//# sourceMappingURL=main.js.map