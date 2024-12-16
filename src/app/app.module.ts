import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from "src/notifications/notifications.module";
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import * as dotenv from 'dotenv';
import { DatabaseModule } from 'src/database/database.module';
import { LocationModule } from 'src/location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), ScheduleModule.forRoot(), 
    DatabaseModule, 
    AuthModule, 
    LocationModule,
    NotificationsModule, 
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }