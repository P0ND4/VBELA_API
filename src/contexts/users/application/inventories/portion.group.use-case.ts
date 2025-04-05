import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { Group } from '../../domain/types/common/group.entity';
import { PortionGroupRepositoryEntity } from '../../domain/repositories/inventories/portion.group.repository.entity';

@Injectable()
export class PortionGroupUseCase {
  constructor(private readonly portionGroupRepository: PortionGroupRepositoryEntity) {}

  async add(identifier: string, portionGroup: Group): Promise<ApiResponse<null>> {
    return await this.portionGroupRepository.add(identifier, portionGroup);
  }

  async edit(identifier: string, id: string, portionGroup: Group): Promise<ApiResponse<null>> {
    return await this.portionGroupRepository.edit(identifier, id, portionGroup);
  }

  async remove(
    identifier: string,
    groupID: string,
  ): Promise<ApiResponse<null>> {
    return await this.portionGroupRepository.remove(identifier, groupID);
  }
}
