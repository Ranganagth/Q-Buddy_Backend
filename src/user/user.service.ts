import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './model/user.dto';
import { User } from './model/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async signIn(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ email, password });

        if (!user) {
            throw new Error('Invalid credentials');
        }
        if (!password) {
            throw new Error('Invalid credentials');
        }

        return user;
    }
}
