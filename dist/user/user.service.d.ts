import { Model } from 'mongoose';
import { User } from './model/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    getUserById(userId: string): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    getUsersByRole(role: string): Promise<Pick<User, '_id' | 'name' | 'email' | 'contactNumber' | 'role'>[]>;
}
