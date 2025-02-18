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
import { OrderEvents } from '../../../repositories/common/order.events';

@Module({
  imports: [SchemaModule],
  controllers: [
    MenuController,
    OrderController,
    RestaurantController,
    TableController,
  ],
  providers: [
    OrderEvents,
    MenuRepository,
    OrderRepository,
    RestaurantRepository,
    TableRepository,

    MenuUseCase,
    OrderUseCase,
    RestaurantUseCase,
    TableUseCase,

    { provide: MenuRepositoryEntity, useExisting: MenuRepository },
    { provide: OrderRepositoryEntity, useExisting: OrderRepository },
    { provide: RestaurantRepositoryEntity, useExisting: RestaurantRepository },
    { provide: TableRepositoryEntity, useExisting: TableRepository },
  ],
})
export class RestaurantModule {}
