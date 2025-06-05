import { Module } from '@nestjs/common';
import { WebsocketGateway } from './ws.gateway';
import { WsJwtGuard } from './ws-jwt.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    WebsocketGateway,
    WsJwtGuard,
    JwtService,
  ],
})
export class GatewayModule {}
