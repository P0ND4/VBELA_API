import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { validate } from 'class-validator';
import { TemporalTokenService } from 'src/contexts/users/infrastructure/services/temporal-token.service';
import { AuthUseCase } from 'src/contexts/users/application/auth/auth.use-case';
import { LoginHttpDto } from '../dto/auth.http-dto';
@Injectable()
export class CustomStrategy extends PassportStrategy(
  Strategy,
  'custom-identifier',
) {
  constructor(
    private temporalTokenService: TemporalTokenService,
    private authUseCase: AuthUseCase,
  ) {
    super();
  }

  static key = 'custom-identifier';

  async validate(
    @Request() req,
  ): Promise<ApiResponse<{ access_token: string; refresh_token: string }>> {
    const { identifier, selected, token } = req.body;

    const loginDto = new LoginHttpDto({
      identifier,
      selected,
      token,
    });

    const errors = await validate(loginDto);
    if (!!errors.length) throw new UnauthorizedException('Validation failed');

    const isValid = await this.temporalTokenService.validateAndConsumeToken(token);
    if (!isValid) throw new UnauthorizedException('Token expired or invalid');

    return await this.authUseCase.login(identifier, selected);
  }
}
