import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { minutes, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MongooseDatabaseModule } from '../database/mongoose.module';
import { MainModule } from 'src/contexts/users/infrastructure/main.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfig } from 'src/config/mail.config';
import { MailService } from 'src/contexts/shared/mail/mail.service';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { RedisModule } from 'src/database/redis.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ThrottlerModule.forRootAsync({
      imports: [RedisModule],
      inject: ['REDIS_THROTTLER'],
      useFactory: (redisThrottler) => ({
        throttlers: [{ ttl: minutes(1), limit: 60 }], // 60 solicitudes por minuto
        storage: new ThrottlerStorageRedisService(redisThrottler),
      }),
    }),
    MailerModule.forRootAsync({
      useFactory: getMailConfig,
      inject: [ConfigService],
    }),
    MongooseDatabaseModule,
    MainModule,
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
