import { ApiResponse } from "../../../../shared/api.response";
import { Group } from "../../types/common/group.entity";

export abstract class PortionGroupRepositoryEntity {
  abstract add(identifier: string, portionGroup: Group): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, portionGroup: Group): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, portionGroupID: string): Promise<ApiResponse<null>>;
}
