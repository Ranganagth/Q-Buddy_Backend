import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as webPush from 'web-push';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific origin
  app.enableCors({
    origin: 'http://127.0.0.1:5500', // Allow requests only from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to send cookies, etc.
  });

  await app.listen(3000);
}

const vapidKeys = {
  publicKey: 'BKrrAwAE3-0osuXNW4iE9HBJME5bzQmC2fL4QbeEOLjilTuxR-C9xpvYqZDiYITICLxcOvcQvjHg_PT30PeBfvc',
  privateKey: 'cZ8w5z8aqZw7eKDsQ_6-W8z0tBCClWvgNietzT1QSLE',
};

webPush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

bootstrap();
