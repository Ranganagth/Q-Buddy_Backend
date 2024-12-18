import { Controller, Get, Req, NotFoundException, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Req() req: Request) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { name, email } = user;
    return { name, email };
  } catch(error) {
    console.error('Error in getCurrentUser:', error);
    throw error;
  }

  @Get('byId/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('getAllUsers')
  async getAllUsers() {
    return await this.userService.getUsersByRole('User');
  }

  @Get('getAllPartners')
  async getAllPartners() {
    return await this.userService.getUsersByRole('Partner');
  }
}
