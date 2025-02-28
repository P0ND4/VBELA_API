import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { RecipeRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/recipe.repository.entity';
import { Recipe } from '../../domain/types';


@Injectable()
export class RecipeUseCase {
  constructor(private readonly inventoryRepository: RecipeRepositoryEntity) {}

  async add(identifier: string, recipe: Recipe): Promise<ApiResponse<null>> {
    return await this.inventoryRepository.add(identifier, recipe);
  }

  async edit(identifier: string, id: string, recipe: Recipe): Promise<ApiResponse<null>> {
    return await this.inventoryRepository.edit(identifier, id, recipe);
  }

  async remove(identifier: string, recipeID: string): Promise<ApiResponse<null>> {
    return await this.inventoryRepository.remove(identifier, recipeID);
  }
}
