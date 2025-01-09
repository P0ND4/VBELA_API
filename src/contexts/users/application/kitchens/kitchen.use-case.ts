import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/users/domain/api.response';
import { KitchenRepositoryEntity } from 'src/contexts/users/domain/repositories/kitchens/kitchen.repository.entity';
import { Kitchen } from '../../domain/types';

@Injectable()
export class KitchenUseCase {
  constructor(private readonly kitchenRepository: KitchenRepositoryEntity) {}

  async add(identifier: string, kitchen: Kitchen): Promise<ApiResponse> {
    return await this.kitchenRepository.add(identifier, kitchen);
  }

  async edit(identifier: string, kitchen: Kitchen): Promise<ApiResponse> {
    return await this.kitchenRepository.edit(identifier, kitchen);
  }

  async remove(identifier: string, kitchenID: string): Promise<ApiResponse> {
    return await this.kitchenRepository.remove(identifier, kitchenID);
  }
}
