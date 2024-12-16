import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true})
  contactNumber: number;

  // Fix: Explicitly define the type of 'location'
  @Prop({ type: { lat: Number, lng: Number }, default: null })
  location: { lat: number; lng: number };
}

export const UserSchema = SchemaFactory.createForClass(User);
