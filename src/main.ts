import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as webPush from 'web-push';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific origin
  app.enableCors({
    origin: ['https://sweet-sunburst-77e346.netlify.app/', 'http://localhost:3001'], // Allow requests only from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to send cookies, etc.
    allowedHeaders: 'Content-Type, Accept, Authorization'
  });

  await app.listen(3000);
}

const vapidKeys = {
  publicKey: 'BJ_RCJTMyRUtQTDeIHDRS2m9JefdxS1lA_Ryo3MPhJ89I3yyG1ts9VdrIWuxuj2EAHwt70h43WqROsbF7qb53mA',
  privateKey: 'AfjNKSeJPBDCswm-W_TxOG6jbpfg9XIU8YbqdjcVhy0',
};

webPush.setVapidDetails(
  'mailto:nevil.mali23799@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

bootstrap();
