import { Module } from '@nestjs/common';
import { SchemaModule } from '../../../schema/user/shema.module';
import { ProductController } from './controllers/product.controller';
import { SaleController } from './controllers/sale.controller';
import { StoreController } from './controllers/store.controller';
import { ProductRepository } from '../../../repositories/stores/product.repository';
import { SaleRepository } from '../../../repositories/stores/sale.repository';
import { StoreRepository } from '../../../repositories/stores/store.repository';
import { ProductUseCase } from 'src/contexts/users/application/stores/product.use-case';
import { SaleUseCase } from 'src/contexts/users/application/stores/sale.use-case';
import { StoreUseCase } from 'src/contexts/users/application/stores/store.use-case';
import { ProductRepositoryEntity } from 'src/contexts/users/domain/repositories/stores/product.repository.entity';
import { SaleRepositoryEntity } from 'src/contexts/users/domain/repositories/stores/sale.repository.entity';
import { StoreRepositoryEntity } from 'src/contexts/users/domain/repositories/stores/store.repository.entity';
import { MovementEvents } from '../../../repositories/common/movement.events';
import { ProductGroupController } from './controllers/product.group.controller';
import { ProductGroupRepository } from '../../../repositories/stores/product.group.repository';
import { ProductGroupUseCase } from 'src/contexts/users/application/stores/product.group.use-case';
import { ProductGroupRepositoryEntity } from 'src/contexts/users/domain/repositories/stores/product.group.repository.entity';

@Module({
  imports: [SchemaModule],
  controllers: [
    ProductController,
    SaleController,
    StoreController,
    ProductGroupController,
  ],
  providers: [
    MovementEvents,
    ProductRepository,
    SaleRepository,
    StoreRepository,
    ProductGroupRepository,

    ProductUseCase,
    SaleUseCase,
    StoreUseCase,
    ProductGroupUseCase,

    { provide: ProductRepositoryEntity, useExisting: ProductRepository },
    { provide: SaleRepositoryEntity, useExisting: SaleRepository },
    { provide: StoreRepositoryEntity, useExisting: StoreRepository },
    { provide: ProductGroupRepositoryEntity, useExisting: ProductGroupRepository },
  ],
})
export class StoreModule {}
