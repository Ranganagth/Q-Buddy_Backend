import { Controller, Post, Body, Get, Req, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './model/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // @Post('signup')
    // async signUp(@Body() createUserDto: CreateUserDto) {
    //     return this.userService.create(createUserDto);
    // }

    // @Post('signin')
    // async signIn(@Body() body: { email: string, password: string }) {
    //     try {
    //         const user = await this.userService.signIn(body.email, body.password);
    //         return {
    //             message: 'Login successful',
    //             user,
    //         };
    //     } catch (error) {
    //         return {
    //             message: error.message || 'An error occurred',
    //         };
    //     }
    // }

    @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
