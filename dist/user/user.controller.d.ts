import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserById(id: string): Promise<import("./model/user.schema").User>;
}
