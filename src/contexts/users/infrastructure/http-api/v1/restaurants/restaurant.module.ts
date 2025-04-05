import { Module } from '@nestjs/common';
import { SchemaModule } from '../../../schema/user/shema.module';
import { MenuController } from './controllers/menu.controller';
import { OrderController } from './controllers/order.controller';
import { RestaurantController } from './controllers/restaurant.controller';
import { TableController } from './controllers/table.controller';
import { MenuRepository } from '../../../repositories/restaurants/menu.repository';
import { OrderRepository } from '../../../repositories/restaurants/order.repository';
import { RestaurantRepository } from '../../../repositories/restaurants/restaurant.repository';
import { TableRepository } from '../../../repositories/restaurants/table.repository';
import { MenuUseCase } from 'src/contexts/users/application/restaurants/menu.use-case';
import { OrderUseCase } from 'src/contexts/users/application/restaurants/order.use-case';
import { RestaurantUseCase } from 'src/contexts/users/application/restaurants/restaurant.use-case';
import { TableUseCase } from 'src/contexts/users/application/restaurants/table.use-case';
import { MenuRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/menu.repository.entity';
import { OrderRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/order.repository.entity';
import { RestaurantRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/restaurant.repository.entity';
import { TableRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/table.repository.entity';
import { MovementEvents } from '../../../repositories/common/movement.events';
import { MenuGroupController } from './controllers/menu.group.controller';
import { MenuGroupRepository } from '../../../repositories/restaurants/menu.group.repository';
import { MenuGroupUseCase } from 'src/contexts/users/application/restaurants/menu.group.use-case';
import { MenuGroupRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/menu.group.repository.entity';

@Module({
  imports: [SchemaModule],
  controllers: [
    MenuController,
    OrderController,
    RestaurantController,
    TableController,
    MenuGroupController,
  ],
  providers: [
    MovementEvents,
    MenuRepository,
    OrderRepository,
    RestaurantRepository,
    TableRepository,
    MenuGroupRepository,

    MenuUseCase,
    OrderUseCase,
    RestaurantUseCase,
    TableUseCase,
    MenuGroupUseCase,

    { provide: MenuRepositoryEntity, useExisting: MenuRepository },
    { provide: OrderRepositoryEntity, useExisting: OrderRepository },
    { provide: RestaurantRepositoryEntity, useExisting: RestaurantRepository },
    { provide: TableRepositoryEntity, useExisting: TableRepository },
    { provide: MenuGroupRepositoryEntity, useExisting: MenuGroupRepository },
  ],
})
export class RestaurantModule {}
