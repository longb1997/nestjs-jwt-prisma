import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register a new user
  @Post('register')
  register() {
    return this.authService.register();
  }

  // Login a user
  @Post('login')
  login() {
    return this.authService.login();
  }
}
