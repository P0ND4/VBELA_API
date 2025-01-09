import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { AuthUseCase } from 'src/contexts/users/application/auth/auth.use-case';
import { LoginHttpDto } from '../dto/auth.http-dto';
import { validate } from 'class-validator';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, "custom-identifier") {
  constructor(private authUseCase: AuthUseCase) {
    super();
  }

  static key = "custom-identifier";

  async validate(@Request() req): Promise<{ access_token: string }> {
    const { identifier, expoID } = req.body;

    const loginDto = new LoginHttpDto({ identifier, expoID });

    const errors = await validate(loginDto);
    if (!!errors.length) throw new UnauthorizedException("Validation failed")

    return await this.authUseCase.login({ identifier, expoID });
  }
}
