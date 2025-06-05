import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(JwtStrategy.key) {
  handleRequest(err, user, info) {
    if (err || !user || user.tokenType !== 'refresh_token') {
      throw err || new UnauthorizedException('Token de refresco inválido');
    }
    return user;
  }
}
