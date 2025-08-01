import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { minutes, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MongooseDatabaseModule } from '../database/mongoose.module';
import { MainModule as MainUserModule } from 'src/contexts/users/infrastructure/main.module';
import { MainModule as MainConfigModule } from 'src/contexts/app-config/infrastructure/config.module';
import { HealthModule as MainHealthModule } from 'src/contexts/health/infrastructure/http-api/v1/health/health.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfig } from 'src/config/mail.config';
import { MailService } from 'src/contexts/shared/mail/mail.service';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { RedisModule } from 'src/database/redis.module';
import { APP_GUARD } from '@nestjs/core';
import { GatewayModule } from 'src/contexts/users/infrastructure/websockets/v1/ws.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ThrottlerModule.forRootAsync({
      imports: [RedisModule],
      inject: ['REDIS_THROTTLER'],
      useFactory: (redisThrottler) => ({
        throttlers: [{ ttl: minutes(1), limit: 60 }],
        storage: new ThrottlerStorageRedisService(redisThrottler),
      }),
    }),
    MailerModule.forRootAsync({
      useFactory: getMailConfig,
      inject: [ConfigService],
    }),
    MongooseDatabaseModule,
    GatewayModule,
    MainConfigModule,
    MainUserModule,
    MainHealthModule
  ],
  providers: [
    MailService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
