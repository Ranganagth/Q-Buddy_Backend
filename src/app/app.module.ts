import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from "src/notifications/notifications.module";
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { APP_CONFIG } from 'src/config/constants';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(APP_CONFIG.DATABASE.MONGODB_URI), 
    ScheduleModule.forRoot(), 
    NotificationsModule, 
    UserModule,
    AuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }