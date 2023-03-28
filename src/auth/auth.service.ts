import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(private prismaServices: PrismaService, private jwtServices: JwtService, private configService: ConfigService) {}
  async register(authDTO: AuthDto) {
    try {
      const hashedPassword = await argon2.hash(authDTO.password);
      //insert user into database
      const user = await this.prismaServices.user.create({
        data: {
          email: authDTO.email,
          hashedPassword,
          firstName: '',
          lastName: '',
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      return this.signJwtToken(user.id, user.email);
    } catch (error) {
      if (error.code === 'P2002' && error.meta.target.includes('email')) {
        throw new Error('Email already in use');
      }
      return error;
    }
  }

  async login(authDTO: AuthDto) {
    const user = await this.prismaServices.user.findUnique({
      where: {
        email: authDTO.email,
      },
    });
    if (user) {
      const passwordMatched = await argon2.verify(user.hashedPassword, authDTO.password);
      if (!passwordMatched) {
        throw new ForbiddenException('Password incorrect');
      }
    } else {
      throw new ForbiddenException('User not found');
    }
    delete user.hashedPassword;
    return this.signJwtToken(user.id, user.email);
  }

  async signJwtToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const jwtString = await this.jwtServices.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      access_token: jwtString,
    };
  }
}
