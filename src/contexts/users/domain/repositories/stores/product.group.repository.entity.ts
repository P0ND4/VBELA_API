import { ApiResponse } from "../../../../shared/api.response";
import { Group } from "../../types/common/group.entity";

export abstract class ProductGroupRepositoryEntity {
  abstract add(identifier: string, productGroup: Group): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, productGroup: Group): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, productGroupID: string): Promise<ApiResponse<null>>;
}
