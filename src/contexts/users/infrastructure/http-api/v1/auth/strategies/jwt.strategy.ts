import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenBlacklistService } from 'src/contexts/users/infrastructure/services/token-blacklist.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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

  async validate(
    request: Request,
    payload: { id: string; identifier: string },
  ) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    
    if (!token) throw new UnauthorizedException('Token no proporcionado');

    const isBlacklisted = await this.tokenBlacklistService.has(token);
    if (isBlacklisted)
      throw new UnauthorizedException('Token ha sido invalidado');

    return { id: payload.id, identifier: payload.identifier };
  }
}
