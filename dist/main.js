"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const webPush = require("web-push");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:8080', 'http://localhost:4200', 'http://localhost:3001'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Content-Type, Accept, Authorization'
    });
    await app.listen(3000);
}
const vapidKeys = {
    publicKey: 'BJ_RCJTMyRUtQTDeIHDRS2m9JefdxS1lA_Ryo3MPhJ89I3yyG1ts9VdrIWuxuj2EAHwt70h43WqROsbF7qb53mA',
    privateKey: 'AfjNKSeJPBDCswm-W_TxOG6jbpfg9XIU8YbqdjcVhy0',
};
webPush.setVapidDetails('mailto:your-email@example.com', vapidKeys.publicKey, vapidKeys.privateKey);
bootstrap();
//# sourceMappingURL=main.js.map