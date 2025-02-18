import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { CustomAuthGuard } from '../guards/custom-auth.guard';
import { V1_USER } from '../../../route.constants';
import { minutes, Throttle } from '@nestjs/throttler';
import { AuthUseCase } from 'src/contexts/users/application/auth/auth.use-case';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller(`${V1_USER}/auth`)
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Throttle({ default: { ttl: minutes(1), limit: 3 } })
  @UseGuards(CustomAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authUseCase.logout(token);
  }
}
