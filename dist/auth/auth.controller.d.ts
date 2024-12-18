import { AuthService } from './auth.service';
import { JwtToken } from './jwt-token.model';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getProtectedData(): string;
    register(body: {
        name: string;
        email: string;
        password: string;
        contactNumber: number;
        role: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        user?: undefined;
        token?: undefined;
    } | {
        message: string;
        user: import("./user.schema").User;
        token: string;
    }>;
    getUser(id: string): Promise<{
        message: string;
        user: import("./user.schema").User;
    } | {
        message: any;
        user?: undefined;
    }>;
    getProfile(req: Request): Promise<{
        user: JwtToken;
    }>;
}
