import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';
import { Model } from 'mongoose';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    register(name: string, email: string, password: string, contactNumber: number, role: string): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    validateUser(email: string, password: string): Promise<User | null>;
    validateUserAndGenerateToken(email: string, password: string): Promise<{
        user: User | null;
        token: string | null;
    }>;
    getUserById(userId: string): Promise<User>;
}
