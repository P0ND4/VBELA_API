import { Module } from '@nestjs/common';
import { SchemaModule } from '../../../schema/user/shema.module';
import { InventoryController } from './controllers/inventory.controller';
import { RecipeController } from './controllers/recipe.controller';
import { StockController } from './controllers/stock.controller';
import { InventoryRepository } from '../../../repositories/inventories/inventory.repository';
import { RecipeRepository } from '../../../repositories/inventories/recipe.repository';
import { StockRepository } from '../../../repositories/inventories/stock.repository';
import { InventoryUseCase } from 'src/contexts/users/application/inventories/inventory.use-case';
import { RecipeUseCase } from 'src/contexts/users/application/inventories/recipe.use-case';
import { StockUseCase } from 'src/contexts/users/application/inventories/stock.use-case';
import { InventoryRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/inventory.repository.entity';
import { RecipeRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/recipe.repository.entity';
import { StockRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/stock.repository.entity';

@Module({
  imports: [SchemaModule],
  controllers: [InventoryController, RecipeController, StockController],
  providers: [
    InventoryRepository,
    RecipeRepository,
    StockRepository,

    InventoryUseCase,
    RecipeUseCase,
    StockUseCase,
    
    { provide: InventoryRepositoryEntity, useExisting: InventoryRepository },
    { provide: RecipeRepositoryEntity, useExisting: RecipeRepository },
    { provide: StockRepositoryEntity, useExisting: StockRepository },
  ],
})
export class InventoryModule {}
