import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { InventoryRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/inventory.repository.entity';
import { Inventory } from '../../domain/types';

@Injectable()
export class InventoryUseCase {
  constructor(private readonly inventoryRepository: InventoryRepositoryEntity) {}

  async add(identifier: string, inventory: Inventory): Promise<ApiResponse<null>> {
    return await this.inventoryRepository.add(identifier, inventory);
  }

  async edit(identifier: string, id: string, inventory: Inventory): Promise<ApiResponse<null>> {
    return await this.inventoryRepository.edit(identifier, id, inventory);
  }

  async remove(identifier: string, inventoryID: string): Promise<ApiResponse<null>> {
    return await this.inventoryRepository.remove(identifier, inventoryID);
  }
}
