import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as webPush from 'web-push';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific origin
  app.enableCors({
    origin: ['http://127.0.0.1:5500','http://127.0.0.1:8080', 'http://localhost:4200'], // Allow requests only from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to send cookies, etc.
  });

  await app.listen(3000);
}

const vapidKeys = {
  publicKey: 'BJ_RCJTMyRUtQTDeIHDRS2m9JefdxS1lA_Ryo3MPhJ89I3yyG1ts9VdrIWuxuj2EAHwt70h43WqROsbF7qb53mA',
  privateKey: 'AfjNKSeJPBDCswm-W_TxOG6jbpfg9XIU8YbqdjcVhy0',
};

webPush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

bootstrap();
