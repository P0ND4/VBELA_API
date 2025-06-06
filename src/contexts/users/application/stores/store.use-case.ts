import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { StoreRepositoryEntity } from 'src/contexts/users/domain/repositories/stores/store.repository.entity';
import { Location } from '../../domain/types';

@Injectable()
export class StoreUseCase {
  constructor(private readonly storeRepository: StoreRepositoryEntity) {}

  async add(identifier: string, store: Location): Promise<ApiResponse<null>> {
    return await this.storeRepository.add(identifier, store);
  }

  async edit(identifier: string, id: string, store: Location): Promise<ApiResponse<null>> {
    return await this.storeRepository.edit(identifier, id, store);
  }

  async remove(identifier: string, storeID: string): Promise<ApiResponse<null>> {
    return await this.storeRepository.remove(identifier, storeID);
  }
}
