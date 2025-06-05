import { Injectable, Inject, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class TokenBlacklistService {
  private readonly logger = new Logger(TokenBlacklistService.name);

  constructor(
    @Inject('REDIS_BLACKLIST_TOKEN') private readonly redisClient: Redis,
  ) {}

  async add(tokens: string[], ttlSeconds?: number): Promise<void> {
    try {
      const pipeline = this.redisClient.pipeline();
      
      tokens.forEach(token => {
        if (ttlSeconds) pipeline.set(token, 'blacklisted', 'EX', ttlSeconds);
        else pipeline.set(token, 'blacklisted');
      });

      await pipeline.exec();
      
      this.logger.log(`Added ${tokens.length} tokens to blacklist`);
    } catch (error) {
      this.logger.error('Error adding tokens to blacklist', error.stack);
      throw new Error('Failed to blacklist tokens');
    }
  }

  async has(token: string): Promise<boolean> {
    try {
      const result = await this.redisClient.get(token);
      return result === 'blacklisted';
    } catch (error) {
      this.logger.error('Error checking token blacklist', error.stack);
      return true;
    }
  }
}