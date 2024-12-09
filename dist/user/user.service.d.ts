import { Model } from 'mongoose';
import { CreateUserDto } from './model/user.dto';
import { User } from './model/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    signIn(email: string, password: string): Promise<any>;
}
