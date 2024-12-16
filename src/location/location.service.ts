import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/model/user.schema';  // Import the User interface

@Injectable()
export class LocationService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}  // Use 'User' as the model name

  // Method to update a user's location
  async updateUserLocation(userId: string, location: { lat: number; lng: number }) {
    const user = await this.userModel.findById(userId);
    if (user) {
      user.location = location;
      await user.save();
    }
  }

  // Method to get all user locations
  async getAllUserLocations() {
    return this.userModel.find({ location: { $ne: null } }, 'username location _id');
  }
}
