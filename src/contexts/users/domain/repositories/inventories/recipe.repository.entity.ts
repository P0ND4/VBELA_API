import { ApiResponse } from "../../../../shared/api.response";
import { Recipe } from "../../types";

export abstract class RecipeRepositoryEntity {
  abstract add(identifier: string, recipe: Recipe): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, recipe: Recipe): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, recipeID: string): Promise<ApiResponse<null>>;
}
