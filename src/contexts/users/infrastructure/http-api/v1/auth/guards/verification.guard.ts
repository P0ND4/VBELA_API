import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class VerificationGuard implements CanActivate {
  constructor(
    @Inject('REDIS_VERIFICATION') private redisClient: RedisClientType,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip;

    // Verificar si el usuario está bloqueado
    const redisKey = `verify:${ip}`;
    const ttl = await this.redisClient.ttl(redisKey);

    if (ttl > 0) {
      throw new UnauthorizedException(
        `Acceso bloqueado. Intenta de nuevo en ${ttl > 0 ? ttl : 0} segundos.`,
      );
    }

    return true; // Permitir acceso si no está bloqueado
  }
}
