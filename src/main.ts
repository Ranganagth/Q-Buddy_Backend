import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as webPush from 'web-push';
import { APP_CONFIG } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific origin
  app.enableCors({
    origin: APP_CONFIG.CORS_ORIGINS,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to send cookies, etc.
    allowedHeaders: 'Content-Type, Accept, Authorization'
  });

  await app.listen(3000);
}

webPush.setVapidDetails(
  APP_CONFIG.WEB_PUSH.CONTACT_EMAIL,
  APP_CONFIG.WEB_PUSH.PUBLIC_KEY,
  APP_CONFIG.WEB_PUSH.PRIVATE_KEY,
);

bootstrap();
