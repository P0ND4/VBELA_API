import { ApiResponse } from "../../../../shared/api.response";
import { Group } from "../../types/common/group.entity";

export abstract class MenuGroupRepositoryEntity {
  abstract add(identifier: string, menuGroup: Group): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, menuGroup: Group): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, menuGroupID: string): Promise<ApiResponse<null>>;
}
