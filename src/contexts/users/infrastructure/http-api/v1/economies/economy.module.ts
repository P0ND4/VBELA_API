import { Module } from '@nestjs/common';
import { SchemaModule } from '../../../schema/user/shema.module';
import { EconomyController } from '../economies/controllers/economy.controller';
import { EconomyRepository } from '../../../repositories/economies/economy.repository';
import { EconomyUseCase } from 'src/contexts/users/application/economies/economy.use-case';
import { EconomyRepositoryEntity } from 'src/contexts/users/domain/repositories/economies/economy.respository.entity';

@Module({
  imports: [SchemaModule],
  controllers: [EconomyController],
  providers: [
    EconomyRepository,
    EconomyUseCase,
    { provide: EconomyRepositoryEntity, useExisting: EconomyRepository },
  ],
})
export class EconomyModule {}
