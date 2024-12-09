import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from "src/notifications/notifications.module";
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://QBuddy:Qbuddy%40123@q-buddy.3rr4w.mongodb.net/QBuddy'), ScheduleModule.forRoot(), NotificationsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }