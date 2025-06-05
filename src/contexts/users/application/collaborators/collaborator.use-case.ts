import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { Collaborator } from '../../domain/types';
import { CollaboratorRepositoryEntity } from '../../domain/repositories/collaborators/collaborator.repository.entity';

@Injectable()
export class CollaboratorUseCase {
  constructor(private readonly collaboratorRepository: CollaboratorRepositoryEntity) {}

  async add(identifier: string, collaborator: Collaborator): Promise<ApiResponse<null>> {
    return await this.collaboratorRepository.add(identifier, collaborator);
  }

  async edit(identifier: string, id: string, collaborator: Collaborator): Promise<ApiResponse<null>> {
    return await this.collaboratorRepository.edit(identifier, id, collaborator);
  }

  async remove(identifier: string, collaboratorID: string): Promise<ApiResponse<null>> {
    return await this.collaboratorRepository.remove(identifier, collaboratorID);
  }
}
