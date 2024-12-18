import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './model/user.dto';
import { User } from './model/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    // async create(createUserDto: CreateUserDto): Promise<User> {
    //     const createdUser = new this.userModel(createUserDto);
    //     return createdUser.save();
    // }

    // async signIn(email: string, password: string): Promise<any> {
    //     const user = await this.userModel.findOne({ email, password });
    //     if (!user) {
    //         throw new Error('Invalid credentials');
    //     }
    //     if (!password) {
    //         throw new Error('Invalid credentials');
    //     }
    //     return user;
    // }

    async getUserById(userId: string) {
        try {
            const user = await this.userModel.findById(userId).exec();
            return user;
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }

    async getUsersByRole(role: string): Promise<Pick<User, '_id' | 'name' | 'email' | 'contactNumber' | 'role'>[]> {
        try {
            return await this.userModel
                .find({ role })
                .select('_id name email contactNumber role') // Explicitly select required fields
                .lean()
                .exec();
        } catch (error) {
            throw new Error(`Error fetching ${role}s: ${error.message}`);
        }
    }
}
