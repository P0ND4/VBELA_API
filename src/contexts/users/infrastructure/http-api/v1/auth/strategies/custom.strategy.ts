import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { AuthUseCase } from 'src/contexts/users/application/auth/auth.use-case';
import { LoginHttpDto } from '../dto/auth.http-dto';
import { validate } from 'class-validator';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CustomStrategy extends PassportStrategy(
  Strategy,
  'custom-identifier',
) {
  constructor(
    private authUseCase: AuthUseCase,
    private configService: ConfigService,
  ) {
    super();
  }

  static key = 'custom-identifier';

  private validateHash(
    identifier: string,
    hash: string,
    timestamp: number,
  ): boolean {
    const secret = this.configService.get<string>('LOGIN_SECRET');
    const currentTime = Math.floor(Date.now() / 1000);

    if (Math.abs(currentTime - timestamp) > 60) return false;

    const expectedHash = CryptoJS.HmacSHA256(
      `${identifier}:${timestamp}`,
      secret,
    ).toString();
    return expectedHash === hash;
  }

  async validate(
    @Request() req,
  ): Promise<ApiResponse<{ access_token: string }>> {
    const { identifier, collaborator, expoID, hash, timestamp } = req.body;

    const loginDto = new LoginHttpDto({ identifier, expoID, hash, timestamp });

    const errors = await validate(loginDto);
    if (!!errors.length) throw new UnauthorizedException('Validation failed');

    const isValid = this.validateHash(identifier, hash, timestamp);
    if (!isValid) throw new UnauthorizedException('Hash invalid');

    return await this.authUseCase.login({ identifier, collaborator, expoID });
  }
}
