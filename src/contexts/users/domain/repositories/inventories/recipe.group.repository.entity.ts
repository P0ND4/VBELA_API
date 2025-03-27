import { ApiResponse } from "../../../../shared/api.response";
import { Group } from "../../types/common/group.entity";

export abstract class RecipeGroupRepositoryEntity {
  abstract add(identifier: string, recipeGroup: Group): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, recipeGroup: Group): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, recipeGroupID: string): Promise<ApiResponse<null>>;
}
