import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationGateway } from './location.gateway';
import { LocationService } from './location.service';
import { User, UserSchema } from '../auth/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [LocationGateway, LocationService],
})
export class LocationModule {}