import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class TokenBlacklistService {
  constructor(
    @Inject('REDIS_BLACKLIST_TOKEN') private readonly redisClient: Redis,
  ) {}

  async add(token: string) {
    await this.redisClient.set(token, 'blacklisted');
  }

  async has(token: string): Promise<boolean> {
    const result = await this.redisClient.get(token);
    return result === 'blacklisted';
  }
}
