import { Module } from '@nestjs/common';
import { SchemaModule } from '../../../schema/user/shema.module';
import { EconomyController } from '../economies/controllers/economy.controller';
import { EconomyRepository } from '../../../repositories/economies/economy.repository';
import { EconomyUseCase } from 'src/contexts/users/application/economies/economy.use-case';
import { EconomyRepositoryEntity } from 'src/contexts/users/domain/repositories/economies/economy.respository.entity';
import { EconomicGroupController } from './controllers/economic.group.controller';
import { EconomicGroupRepository } from '../../../repositories/economies/economic.group.repository';
import { EconomicGroupUseCase } from 'src/contexts/users/application/economies/economic.group.use-case';
import { EconomicGroupRepositoryEntity } from 'src/contexts/users/domain/repositories/economies/economic.group.repository.entity';

@Module({
  imports: [SchemaModule],
  controllers: [EconomyController, EconomicGroupController],
  providers: [
    EconomyRepository,
    EconomicGroupRepository,

    EconomyUseCase,
    EconomicGroupUseCase,

    { provide: EconomyRepositoryEntity, useExisting: EconomyRepository },
    { provide: EconomicGroupRepositoryEntity, useExisting: EconomicGroupRepository },
  ],
})
export class EconomyModule {}
