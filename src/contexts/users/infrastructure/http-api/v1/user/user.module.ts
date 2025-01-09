import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepositoryEntity } from 'src/contexts/users/domain/repositories/user/user.repository.entity';
import { UserRepository } from '../../../repositories/user/user.repository';
import { UserUseCase } from 'src/contexts/users/application/user/user.use-case';
import { SchemaModule } from '../../../schema/shema.module';
import { SettingRepository } from '../../../repositories/user/setting.repository';
import { SettingUseCase } from 'src/contexts/users/application/user/setting.use-case';
import { SettingRepositoryEntity } from 'src/contexts/users/domain/repositories/user/setting.repository.entity';
import { SettingController } from './controllers/setting.controller';

@Module({
  imports: [SchemaModule],
  controllers: [UserController, SettingController],
  providers: [
    UserRepository,
    SettingRepository,  
    UserUseCase,
    SettingUseCase,
    { provide: UserRepositoryEntity, useExisting: UserRepository },
    { provide: SettingRepositoryEntity, useExisting: SettingRepository },
  ],
})
export class UserModule {}
