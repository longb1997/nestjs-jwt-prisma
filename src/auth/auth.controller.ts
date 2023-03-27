import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register a new user
  @Post('register')
  register(@Body() body: AuthDto) {
    console.log(body);
    return this.authService.register(body);
  }

  // Login a user
  @Post('login')
  login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }
}
