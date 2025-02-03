import { Controller, Post, Body, Res } from '@nestjs/common';
import { minutes, Throttle } from '@nestjs/throttler';
import { V1_USER } from '../../../route.constants';
import { CheckEmailHttpDto, CheckPhoneHttpDto } from '../dto/check.http-dto';
import { CheckUseCase } from 'src/contexts/users/application/auth/check.use-case';
import { ApiResponse } from 'src/contexts/shared/api.response';

@Controller(`${V1_USER}/check`)
@Throttle({ default: { ttl: minutes(1), limit: 5 } })
export class CheckController {
  constructor(private readonly checkUseCase: CheckUseCase) {}

  @Post('/email')
  async verifyEmail(@Body() dto: CheckEmailHttpDto): Promise<ApiResponse<null>> {
    return await this.checkUseCase.checkEmail(dto.email, dto.code);
  }

  @Post('/phone')
  async verifyPhone(@Body() dto: CheckPhoneHttpDto): Promise<ApiResponse<null>> {
    return await this.checkUseCase.checkPhone(dto.to, dto.code);
  }
}
