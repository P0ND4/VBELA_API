import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenBlacklistService } from 'src/contexts/users/infrastructure/services/token-blacklist.service';
import { Permissions } from 'src/contexts/users/domain/types';
import { Token } from 'src/contexts/users/domain/token.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private tokenBlacklistService: TokenBlacklistService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  static key = 'jwt';

  async validate(request: Request, payload: Token) {
    const authHeader = request.headers['authorization'];
    const token = authHeader?.replace('Bearer ', '');

    const isBlacklisted = await this.tokenBlacklistService.has(token);
    if (isBlacklisted)
      throw new UnauthorizedException('Token ha sido invalidado');

    return {
      id: payload.id,
      identifier: payload.identifier,
      selected: payload.selected,
      tokenType: payload.tokenType,
      permissions: payload.permissions,
    };
  }
}
