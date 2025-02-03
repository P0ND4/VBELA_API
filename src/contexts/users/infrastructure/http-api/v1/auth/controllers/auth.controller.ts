import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { CustomAuthGuard } from '../guards/custom-auth.guard';
import { V1_USER } from '../../../route.constants';
import { minutes, Throttle } from '@nestjs/throttler';

@Controller(`${V1_USER}/auth`)
export class AuthController {
  @Throttle({ default: { ttl: minutes(1), limit: 3 } })
  @UseGuards(CustomAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
