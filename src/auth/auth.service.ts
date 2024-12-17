import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async register(name: string, email: string, password: string, contactNumber: number, role: string) {
    // console.log("Received name:", name); // Check if the name is passed correctly

    // Check if the user already exists
    const existingUser = await this.userModel.findOne({ name });
    // console.log("Existing User:", existingUser); // Check if the user already exists with the same name

    if (existingUser) {
      throw new Error('name already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, password: hashedPassword, contactNumber, role });

    // Save the user and return the saved user
    try {
      return await user.save();
    } catch (error) {
      throw new Error('Error saving user: ' + error.message);
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    // console.log("Email: ", email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }

  // New method to handle validation and token generation
  async validateUserAndGenerateToken(email: string, password: string): Promise<{ user: User | null, token: string | null }> {
    const user = await this.validateUser(email, password);
    if (!user) {
      return { user: null, token: null };
    }
    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    return { user, token };
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).select('-password');
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }
}
