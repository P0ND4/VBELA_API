import { Module } from '@nestjs/common';
import { SchemaModule } from '../../../schema/user/shema.module';
import { SupplierRepository } from '../../../repositories/suppliers/supplier.repository';
import { SupplierUseCase } from 'src/contexts/users/application/suppliers/supplier.use-case';
import { SupplierRepositoryEntity } from 'src/contexts/users/domain/repositories/suppliers/supplier.repository.entity';
import { SupplierController } from './controllers/supplier.controller';

@Module({
  imports: [SchemaModule],
  controllers: [SupplierController],
  providers: [
    SupplierRepository,
    SupplierUseCase,
    { provide: SupplierRepositoryEntity, useExisting: SupplierRepository },
  ],
})
export class SupplierModule {}
