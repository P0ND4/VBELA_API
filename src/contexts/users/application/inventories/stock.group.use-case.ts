import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { Group } from '../../domain/types/common/group.entity';
import { StockGroupRepositoryEntity } from '../../domain/repositories/inventories/stock.group.repository.entity';

@Injectable()
export class StockGroupUseCase {
  constructor(private readonly stockGroupRepository: StockGroupRepositoryEntity) {}

  async add(identifier: string, stockGroup: Group): Promise<ApiResponse<null>> {
    return await this.stockGroupRepository.add(identifier, stockGroup);
  }

  async edit(identifier: string, id: string, stockGroup: Group): Promise<ApiResponse<null>> {
    return await this.stockGroupRepository.edit(identifier, id, stockGroup);
  }

  async remove(
    identifier: string,
    groupID: string,
  ): Promise<ApiResponse<null>> {
    return await this.stockGroupRepository.remove(identifier, groupID);
  }
}
