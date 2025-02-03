import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { V1_USER } from '../../../route.constants';
import { minutes, Throttle } from '@nestjs/throttler';
import { VerificationGuard } from '../guards/verification.guard';
import { VerifyEmailHttpDto, VerifyPhoneHttpDto } from '../dto/verify.http-dto';
import { VerifyUseCase } from 'src/contexts/users/application/auth/verify.use-case';

@Controller(`${V1_USER}/verify`)
@Throttle({ default: { ttl: minutes(1), limit: 5 } })
@UseGuards(VerificationGuard)
export class VerifyController {
  constructor(private readonly verifyUseCase: VerifyUseCase) {}

  @Post('/email')
  async verifyEmail(@Body() dto: VerifyEmailHttpDto, @Request() req) {
    return await this.verifyUseCase.verifyEmail(dto.email, req.ip);
  }

  @Post('/phone')
  async verifyPhone(@Body() dto: VerifyPhoneHttpDto, @Request() req) {
    return await this.verifyUseCase.verifyPhone(dto.to, dto.channel, req.ip);
  }
}
