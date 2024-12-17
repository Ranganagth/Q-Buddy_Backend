import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './model/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Post('signin')
    async signIn(@Body() body: { email: string, password: string }) {
        try {
            const user = await this.userService.signIn(body.email, body.password);
            return {
                message: 'Login successful',
                user,
            };
        } catch (error) {
            return {
                message: error.message || 'An error occurred',
            };
        }
    }
}
