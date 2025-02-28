import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { KitchenRepositoryEntity } from 'src/contexts/users/domain/repositories/kitchens/kitchen.repository.entity';
import { Kitchen, KitchenDTO } from '../../domain/types';

@Injectable()
export class KitchenUseCase {
  constructor(private readonly kitchenRepository: KitchenRepositoryEntity) {}

  async add(identifier: string, dto: KitchenDTO): Promise<ApiResponse<null>> {
    return await this.kitchenRepository.add(identifier, dto);
  }

  async edit(identifier: string, id: string, kitchen: Kitchen): Promise<ApiResponse<null>> {
    return await this.kitchenRepository.edit(identifier, id, kitchen);
  }

  async remove(identifier: string, kitchenID: string): Promise<ApiResponse<null>> {
    return await this.kitchenRepository.remove(identifier, kitchenID);
  }
}
