import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true },
  role: { type: String, required: true },
});

export interface User extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  role: string;
}
