import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Body,
} from '@nestjs/common';
import { CustomAuthGuard } from '../guards/custom-auth.guard';
import { V1_USER } from '../../../route.constants';
import { minutes, Throttle } from '@nestjs/throttler';
import { AuthUseCase } from 'src/contexts/users/application/auth/auth.use-case';
import { GetSessionsHttpDto, LogoutHttpDto } from '../dto/auth.http-dto';
import { AuthValidationGuard } from '../guards/auth-validation.guard';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { AccessTokenGuard } from '../../../../../../shared/guards/access-token.guard';

@Controller(`${V1_USER}/auth`)
@Throttle({ default: { ttl: minutes(1), limit: 5 } })
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Get('server-time')
  getServerTime() {
    return this.authUseCase.getServerTime();
  }

  @UseGuards(AuthValidationGuard)
  @Post('sessions')
  async getSessions(@Body() dto: GetSessionsHttpDto, @Request() req) {
    return this.authUseCase.getSessions(dto.identifier);
  }

  @UseGuards(CustomAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(@Request() req) {
    return this.authUseCase.refreshToken(req.user);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@Body() body: LogoutHttpDto) {
    return this.authUseCase.logout(body.accessToken, body.refreshToken);
  }
}