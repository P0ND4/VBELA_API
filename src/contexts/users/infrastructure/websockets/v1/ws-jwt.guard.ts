import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard {
  private logger = new Logger(WsJwtGuard.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  validateClient(client: Socket) {
    try {
      const token = 
        client.handshake.auth?.token || 
        client.handshake.query?.token || 
        client.handshake.headers?.authorization?.split(' ')[1];

      if (!token) throw new WsException('Token no encontrado');

      const user = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      if (user.tokenType !== 'access_token')
        throw new WsException('Token inválido: No es un access token');

      client.data.user = user;
      return user;
    } catch (error) {
      this.logger.error(`Error de autenticación: ${error.message}`);
      client.disconnect();
      throw new WsException('Autenticación fallida');
    }
  }
}
