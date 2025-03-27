import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { Movement } from '../../domain/types';
import { MovementRepositoryEntity } from '../../domain/repositories/inventories/movement.repository.entity';

@Injectable()
export class MovementUseCase {
  constructor(private readonly movementRepository: MovementRepositoryEntity) {}

  async add(
    identifier: string,
    movement: Movement,
  ): Promise<ApiResponse<null>> {
    return await this.movementRepository.add(identifier, movement);
  }

  async edit(
    identifier: string,
    id: string,
    movement: Movement,
  ): Promise<ApiResponse<null>> {
    return await this.movementRepository.edit(identifier, id, movement);
  }

  async remove(
    identifier: string,
    movementID: string,
  ): Promise<ApiResponse<null>> {
    return await this.movementRepository.remove(identifier, movementID);
  }
}
