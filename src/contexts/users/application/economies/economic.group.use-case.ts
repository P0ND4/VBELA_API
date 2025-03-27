import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { EconomicGroup } from '../../domain/types';
import { EconomicGroupRepositoryEntity } from '../../domain/repositories/economies/economic.group.repository.entity';

@Injectable()
export class EconomicGroupUseCase {
  constructor(private readonly economyGroupRepository: EconomicGroupRepositoryEntity) {}

  async add(identifier: string, economyGroup: EconomicGroup): Promise<ApiResponse<null>> {
    return await this.economyGroupRepository.add(identifier, economyGroup);
  }

  async edit(identifier: string, id: string, economyGroup: EconomicGroup): Promise<ApiResponse<null>> {
    return await this.economyGroupRepository.edit(identifier, id, economyGroup);
  }

  async remove(identifier: string, economyGroupID: string): Promise<ApiResponse<null>> {
    return await this.economyGroupRepository.remove(identifier, economyGroupID);
  }
}
