import { Module } from '@nestjs/common';
import { AuthModule } from './http-api/v1/auth/auth.module';
import { UserModule } from './http-api/v1/user/user.module';
import { KitchenModule } from './http-api/v1/kitchens/kitchen.module';
import { InventoryModule } from './http-api/v1/inventories/inventory.module';
import { RestaurantModule } from './http-api/v1/restaurants/restaurant.module';
import { StoreModule } from './http-api/v1/stores/store.module';
import { HandlerModule } from './http-api/v1/handlers/handler.module';
import { SupplierModule } from './http-api/v1/suppliers/supplier.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    KitchenModule,
    InventoryModule,
    RestaurantModule,
    StoreModule,
    HandlerModule,
    SupplierModule,
  ],
})
export class MainModule {}
