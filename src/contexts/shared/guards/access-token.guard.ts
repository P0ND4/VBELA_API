import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '../../users/infrastructure/http-api/v1/auth/strategies/jwt.strategy';

@Injectable()
export class AccessTokenGuard extends AuthGuard(JwtStrategy.key) {
  handleRequest(err, user, info) {
    if (err || !user || user.tokenType !== 'access_token') {
      throw err || new UnauthorizedException('Token de acceso inválido');
    }
    return user;
  }
}