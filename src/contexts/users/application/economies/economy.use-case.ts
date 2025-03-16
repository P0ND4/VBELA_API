import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { Economy } from '../../domain/types';
import { EconomyRepositoryEntity } from '../../domain/repositories/economies/economy.respository.entity';

@Injectable()
export class EconomyUseCase {
  constructor(private readonly economyRepository: EconomyRepositoryEntity) {}

  async add(identifier: string, economy: Economy): Promise<ApiResponse<null>> {
    return await this.economyRepository.add(identifier, economy);
  }

  async edit(identifier: string, id: string, economy: Economy): Promise<ApiResponse<null>> {
    return await this.economyRepository.edit(identifier, id, economy);
  }

  async remove(identifier: string, economyID: string): Promise<ApiResponse<null>> {
    return await this.economyRepository.remove(identifier, economyID);
  }
}
