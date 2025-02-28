import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { ProductGroupRepositoryEntity } from '../../domain/repositories/stores/product.group.repository.entity';
import { Group } from '../../domain/types/common/group.entity';

@Injectable()
export class ProductGroupUseCase {
  constructor(private readonly productGroupRepository: ProductGroupRepositoryEntity) {}

  async add(identifier: string, productGroup: Group): Promise<ApiResponse<null>> {
    return await this.productGroupRepository.add(identifier, productGroup);
  }

  async edit(identifier: string, id: string, productGroup: Group): Promise<ApiResponse<null>> {
    return await this.productGroupRepository.edit(identifier, id, productGroup);
  }

  async remove(
    identifier: string,
    groupID: string,
  ): Promise<ApiResponse<null>> {
    return await this.productGroupRepository.remove(identifier, groupID);
  }
}
