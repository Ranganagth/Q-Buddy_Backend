import { Model } from 'mongoose';
import { User } from './model/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    getUserById(userId: string): Promise<User>;
}
