import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as webPush from 'web-push';
import * as dontenv from 'dotenv';

dontenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific origin
  app.enableCors({
    // origin: process.env.ALLOWED_ORIGINS.split(','),
    origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:5501', 'http://127.0.0.1:8080', 'http://localhost:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to send cookies, etc.
  });

  const port = process.env.PORT || 3000;
  // await app.listen(3000);
  await app.listen(port);
  console.log(`Server is running on http://localhost: ${port}`);
}

// const vapidKeys = {
//   publicKey: 'BJ_RCJTMyRUtQTDeIHDRS2m9JefdxS1lA_Ryo3MPhJ89I3yyG1ts9VdrIWuxuj2EAHwt70h43WqROsbF7qb53mA',
//   privateKey: 'AfjNKSeJPBDCswm-W_TxOG6jbpfg9XIU8YbqdjcVhy0',
// };

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
}

webPush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

bootstrap();
