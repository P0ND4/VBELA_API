import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { CustomAuthGuard } from '../guards/custom-auth.guard';
import { V1_USER } from '../../../route.constants';

@Controller(`${V1_USER}/auth`)
export class AuthController {
  @UseGuards(CustomAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
