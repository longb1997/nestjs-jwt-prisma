import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register() {
    return 'Register a new user';
  }

  login() {
    return 'Login new user';
  }
}
