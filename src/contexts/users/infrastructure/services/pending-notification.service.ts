import { Injectable, Inject, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class PendingNotificationService {
  private readonly logger = new Logger(PendingNotificationService.name);
  private readonly prefix = 'pending_notification:';

  constructor(
    @Inject('REDIS_PENDING_NOTIFICATION') private readonly redisClient: Redis,
  ) {}

  async createPendingNotification(identifier: string): Promise<void> {
    try {
      await this.redisClient.set(`${this.prefix}${identifier}`,'1','EX',604800);

      this.logger.log(`Notificación en espera creado`);
    } catch (error) {
      this.logger.error('Error en la creación de la notificación', error.stack);
      throw new Error('No se pudo crear la notificación');
    }
  }

  async validatePendingNotification(identifier: string): Promise<boolean> {
    try {
      const key = `${this.prefix}${identifier}`;
      const exists = await this.redisClient.exists(key);

      if (exists) {
        await this.redisClient.del(key);
        this.logger.debug(`Notificación pendiente consumido`);
        return true;
      }

      return false;
    } catch (error) {
      this.logger.error('Error validando la notificación', error.stack);
      throw new Error('Error validando la notificaciónd');
    }
  }
}
