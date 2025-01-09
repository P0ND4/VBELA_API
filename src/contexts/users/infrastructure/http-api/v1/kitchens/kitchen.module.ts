import { Module } from '@nestjs/common';
import { KitchenController } from './controllers/kitchen.controller';
import { KitchenRepository } from '../../../repositories/kitchens/kitchen.repository';
import { KitchenRepositoryEntity } from 'src/contexts/users/domain/repositories/kitchens/kitchen.repository.entity';
import { SchemaModule } from '../../../schema/shema.module';
import { KitchenUseCase } from 'src/contexts/users/application/kitchens/kitchen.use-case';

@Module({
    imports: [SchemaModule],
    controllers: [KitchenController],
    providers: [
      KitchenUseCase,
      KitchenRepository,
      { provide: KitchenRepositoryEntity, useExisting: KitchenRepository },
    ],
})
export class KitchenModule {}
