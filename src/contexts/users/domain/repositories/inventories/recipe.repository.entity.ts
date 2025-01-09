import { ApiResponse } from "../../api.response";
import { Recipe } from "../../types";

export abstract class RecipeRepositoryEntity {
  abstract add(identifier: string, recipe: Recipe): Promise<ApiResponse>;
  abstract edit(identifier: string, recipe: Recipe): Promise<ApiResponse>;
  abstract remove(identifier: string, recipeID: string): Promise<ApiResponse>;
}
