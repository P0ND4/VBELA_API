import { Module } from '@nestjs/common';
import { Redis } from 'ioredis';

@Module({
  providers: [
    {
      provide: 'REDIS_THROTTLER',
      useFactory: () => {
        return new Redis({
          host: 'localhost',
          port: 6379,
          db: 0,
        });
      },
    },
    {
      provide: 'REDIS_VERIFICATION',
      useFactory: () => {
        return new Redis({
          host: 'localhost',
          port: 6379,
          db: 1,
        });
      },
    },
    {
      provide: 'REDIS_BLACKLIST_TOKEN',
      useFactory: () => {
        return new Redis({
          host: 'localhost',
          port: 6379,
          db: 2,
        });
      },
    },
    {
      provide: 'REDIS_TEMPORAL_TOKEN',
      useFactory: () => {
        return new Redis({
          host: 'localhost',
          port: 6379,
          db: 3,
        });
      },
    },
  ],
  exports: [
    'REDIS_THROTTLER',
    'REDIS_VERIFICATION',
    'REDIS_BLACKLIST_TOKEN',
    'REDIS_TEMPORAL_TOKEN',
  ],
})
export class RedisModule {}
