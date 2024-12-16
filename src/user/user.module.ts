import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './model/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
