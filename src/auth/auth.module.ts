import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_CONFIG } from 'src/config/constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: APP_CONFIG.JWT.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}