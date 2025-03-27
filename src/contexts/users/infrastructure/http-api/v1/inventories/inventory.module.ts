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
import { MovementController } from './controllers/movement.controller';
import { MovementRepository } from '../../../repositories/inventories/movement.repository';
import { MovementUseCase } from 'src/contexts/users/application/inventories/movement.use-case';
import { MovementRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/movement.repository.entity';
import { StockGroupController } from './controllers/stock.group.controller';
import { RecipeGroupController } from './controllers/recipe.group.controller';
import { StockGroupRepository } from '../../../repositories/inventories/stock.group.repository';
import { RecipeGroupRepository } from '../../../repositories/inventories/recipe.group.repository';
import { StockGroupUseCase } from 'src/contexts/users/application/inventories/stock.group.use-case';
import { RecipeGroupUseCase } from 'src/contexts/users/application/inventories/recipe.group.use-case';
import { StockGroupRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/stock.group.repository.entity';
import { RecipeGroupRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/recipe.group.repository.entity';

@Module({
  imports: [SchemaModule],
  controllers: [
    InventoryController,
    RecipeController,
    StockController,
    MovementController,
    StockGroupController,
    RecipeGroupController,
  ],
  providers: [
    InventoryRepository,
    RecipeRepository,
    StockRepository,
    MovementRepository,
    StockGroupRepository,
    RecipeGroupRepository,

    InventoryUseCase,
    RecipeUseCase,
    StockUseCase,
    MovementUseCase,
    StockGroupUseCase,
    RecipeGroupUseCase,

    { provide: InventoryRepositoryEntity, useExisting: InventoryRepository },
    { provide: RecipeRepositoryEntity, useExisting: RecipeRepository },
    { provide: StockRepositoryEntity, useExisting: StockRepository },
    { provide: MovementRepositoryEntity, useExisting: MovementRepository },
    { provide: StockGroupRepositoryEntity, useExisting: StockGroupRepository },
    { provide: RecipeGroupRepositoryEntity, useExisting: RecipeGroupRepository },
  ],
})
export class InventoryModule {}
