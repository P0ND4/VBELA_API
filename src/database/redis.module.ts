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
  ],
  exports: [
    'REDIS_THROTTLER',
    'REDIS_VERIFICATION',
  ],
})
export class RedisModule {}
