import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { Group } from '../../domain/types/common/group.entity';
import { RecipeGroupRepositoryEntity } from '../../domain/repositories/inventories/recipe.group.repository.entity';

@Injectable()
export class RecipeGroupUseCase {
  constructor(private readonly recipeGroupRepository: RecipeGroupRepositoryEntity) {}

  async add(identifier: string, recipeGroup: Group): Promise<ApiResponse<null>> {
    return await this.recipeGroupRepository.add(identifier, recipeGroup);
  }

  async edit(identifier: string, id: string, recipeGroup: Group): Promise<ApiResponse<null>> {
    return await this.recipeGroupRepository.edit(identifier, id, recipeGroup);
  }

  async remove(
    identifier: string,
    groupID: string,
  ): Promise<ApiResponse<null>> {
    return await this.recipeGroupRepository.remove(identifier, groupID);
  }
}
