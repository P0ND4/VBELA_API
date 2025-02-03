import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtContants } from './constants';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from '../../../repositories/auth/auth.repository';
import { AuthUseCase } from 'src/contexts/users/application/auth/auth.use-case';
import { CustomStrategy } from './strategies/custom.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthRepositoryEntity } from 'src/contexts/users/domain/repositories/auth/auth.repository.entity';
import { SchemaModule } from '../../../schema/user/shema.module';
import { RedisModule } from 'src/database/redis.module';
import { MailService } from 'src/contexts/shared/mail/mail.service';
import { CodeModule } from '../../../schema/code/code.module';
import { VerifyController } from './controllers/verify.controller';
import { VerifyRepositoryEntity } from 'src/contexts/users/domain/repositories/auth/verify.repository.entity';
import { VerifyRepository } from '../../../repositories/auth/verify.repository';
import { VerifyUseCase } from 'src/contexts/users/application/auth/verify.use-case';
import { CheckRepository } from '../../../repositories/auth/check.repository';
import { CheckUseCase } from 'src/contexts/users/application/auth/check.use-case';
import { CheckRepositoryEntity } from 'src/contexts/users/domain/repositories/auth/check.repository.entity';
import { CheckController } from './controllers/check.controller';
import { TwilioService } from 'src/contexts/shared/twilio/twilio.service';

@Module({
  imports: [
    RedisModule,
    CodeModule,
    SchemaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: jwtContants,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, VerifyController, CheckController],
  providers: [
    AuthRepository,
    AuthUseCase,

    CheckRepository,
    CheckUseCase,

    VerifyRepository,
    VerifyUseCase,

    CustomStrategy,
    JwtStrategy,

    { provide: AuthRepositoryEntity, useExisting: AuthRepository },
    { provide: VerifyRepositoryEntity, useExisting: VerifyRepository },
    { provide: CheckRepositoryEntity, useExisting: CheckRepository },

    MailService,
    TwilioService,
  ],
})
export class AuthModule {}
