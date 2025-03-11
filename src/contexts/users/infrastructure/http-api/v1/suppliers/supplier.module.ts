import { Module } from '@nestjs/common';
import { SchemaModule } from '../../../schema/user/shema.module';
import { SupplierRepository } from '../../../repositories/suppliers/supplier.repository';
import { SupplierUseCase } from 'src/contexts/users/application/suppliers/supplier.use-case';
import { SupplierRepositoryEntity } from 'src/contexts/users/domain/repositories/suppliers/supplier.repository.entity';
import { SupplierController } from './controllers/supplier.controller';
import { EconomyController } from './controllers/economy.controller';
import { EconomyRepository } from '../../../repositories/suppliers/economy.repository';
import { EconomyUseCase } from 'src/contexts/users/application/suppliers/economy.use-case';
import { EconomyRepositoryEntity } from 'src/contexts/users/domain/repositories/suppliers/economy.respository.entity';

@Module({
  imports: [SchemaModule],
  controllers: [SupplierController, EconomyController],
  providers: [
    SupplierRepository,
    EconomyRepository,

    SupplierUseCase,
    EconomyUseCase,

    { provide: EconomyRepositoryEntity, useExisting: EconomyRepository },
    { provide: SupplierRepositoryEntity, useExisting: SupplierRepository },
  ],
})
export class SupplierModule {}
