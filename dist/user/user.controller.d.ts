import { UserService } from './user.service';
import { CreateUserDto } from './model/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUp(createUserDto: CreateUserDto): Promise<import("./model/user.schema").User>;
    signIn(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        user: any;
    } | {
        message: any;
        user?: undefined;
    }>;
}
