import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtectedData() {
    return 'This is protected data';
  }

  @Post('register')
  async register(@Body() body: { username: string; email: string; password: string, contactNumber: number }) {
    return this.authService.register(body.username, body.email, body.password, body.contactNumber);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { user, token } = await this.authService.validateUserAndGenerateToken(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful', user, token };
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    try {
      const user = await this.authService.getUserById(id);
      if (!user) {
        return { message: 'User not found' };
      }
      return { message: 'User retrieved successfully', user };
    } catch (error) {
      return { message: error.message };
    }
  }
}
