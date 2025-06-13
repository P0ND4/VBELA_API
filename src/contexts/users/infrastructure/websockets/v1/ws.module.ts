import { Module } from '@nestjs/common';
import { WebsocketGateway } from './ws.gateway';
import { WsJwtGuard } from './ws-jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { PendingNotificationService } from '../../services/pending-notification.service';
import { RedisModule } from 'src/database/redis.module';

@Module({
  imports: [RedisModule],
  providers: [
    PendingNotificationService,
    WebsocketGateway,
    WsJwtGuard,
    JwtService,
  ],
})
export class GatewayModule {}
