import { Controller, Post, Body, UseGuards, Get, Param, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtToken } from './jwt-token.model';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtectedData() {
    return 'This is protected data';
  }

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string, contactNumber: number, role: string }) {
    return this.authService.register(body.name, body.email, body.password, body.contactNumber, body.role);
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

  @UseGuards(JwtAuthGuard) // Ensures token is validated
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const user = req.user; // This is set by the JwtStrategy
    return { user };
  }
}
