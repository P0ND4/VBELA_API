import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtContants } from './constants';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from '../../../repositories/auth.repository';
import { AuthUseCase } from 'src/contexts/users/application/auth/auth.use-case';
import { CustomStrategy } from './strategies/custom.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthRepositoryEntity } from 'src/contexts/users/domain/repositories/auth.repository.entity';
import { SchemaModule } from '../../../schema/shema.module';

@Module({
  imports: [
    SchemaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: jwtContants,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthRepository,
    AuthUseCase,
    CustomStrategy,
    JwtStrategy,
    { provide: AuthRepositoryEntity, useExisting: AuthRepository },
  ],
})
export class AuthModule {}
