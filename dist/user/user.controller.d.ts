import { UserService } from './user.service';
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getCurrentUser(req: Request): Promise<{
        name: string;
        email: string;
    }>;
    catch(error: any): void;
    getUserById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./model/user.schema").User> & import("./model/user.schema").User & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    getAllUsers(): Promise<Pick<import("./model/user.schema").User, "name" | "email" | "contactNumber" | "role" | "_id">[]>;
    getAllPartners(): Promise<Pick<import("./model/user.schema").User, "name" | "email" | "contactNumber" | "role" | "_id">[]>;
}
