import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';
import * as webPush from 'web-push';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific origin
  app.enableCors({
    origin: ['http://127.0.0.1:5500','http://127.0.0.1:8080', 'http://localhost:4200', 'http://localhost:3001'], // Allow requests only from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to send cookies, etc.
    allowedHeaders: 'Content-Type, Accept, Authorization'
  });

  await app.listen(3000);
}

const vapidKeys = {
  publicKey: 'BFIs2dOMkwSPaFAzT1KCbzi-7VeGykN4x4mUBcgfTLCvC3GGU8sOdxPyWFNaE_XvTU2VoeCK7tWEiXH0Rnw6HG0',
  privateKey: 'qTXgE-_Z-hzJO6TX69HnDY_pxa8NKf-KHNXNw1CytK0',
};

webPush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

bootstrap();
