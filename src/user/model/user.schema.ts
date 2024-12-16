import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true },
  location: {
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
  },
});

export interface User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  location?: { lat: number; lng: number }; // Add location field to the User interface
}
