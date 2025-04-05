import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { ActivityDTO, Portion } from '../../domain/types';
import { PortionRepositoryEntity } from '../../domain/repositories/inventories/portion.repository.entity';

@Injectable()
export class PortionUseCase {
  constructor(private readonly portionRepository: PortionRepositoryEntity) {}

  async addActivity(identifier: string, dto: ActivityDTO): Promise<ApiResponse<null>> {
    return await this.portionRepository.addActivity(identifier, dto);
  }

  async add(identifier: string, portion: Portion): Promise<ApiResponse<null>> {
    return await this.portionRepository.add(identifier, portion);
  }

  async edit(identifier: string, id: string, portion: Portion): Promise<ApiResponse<null>> {
    return await this.portionRepository.edit(identifier, id, portion);
  }

  async remove(identifier: string, recipeID: string): Promise<ApiResponse<null>> {
    return await this.portionRepository.remove(identifier, recipeID);
  }
}
