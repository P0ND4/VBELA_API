import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TemporalTokenService {
  private readonly logger = new Logger(TemporalTokenService.name);
  private readonly prefix = 'temp_token:';

  constructor(
    private readonly configService: ConfigService,
    @Inject('REDIS_TEMPORAL_TOKEN') private readonly redisClient: Redis,
  ) {}

  async generateToken(): Promise<string> {
    try {
      const token = uuidv4();
      const expiresIn = this.configService.get<number>('TEMPORAL_TOKEN_EXPIRATION');
      
      await this.redisClient.set(`${this.prefix}${token}`, '1', 'EX', expiresIn);
      
      this.logger.log(`Token temporal generado: ${token}`);
      return token;
    } catch (error) {
      this.logger.error('Error generando token temporal', error.stack);
      throw new Error('No se pudo generar el token temporal');
    }
  }

  async validateAndConsumeToken(token: string): Promise<boolean> {
    try {
      const key = `${this.prefix}${token}`;
      const exists = await this.redisClient.exists(key);
      
      if (exists) {
        await this.redisClient.del(key);
        this.logger.debug(`Token consumido: ${token}`);
        return true;
      }
      
      return false;
    } catch (error) {
      this.logger.error('Error validando token temporal', error.stack);
      throw new Error('Error validando token');
    }
  }
}