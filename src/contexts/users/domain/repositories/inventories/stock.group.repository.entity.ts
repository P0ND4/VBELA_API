import { ApiResponse } from "../../../../shared/api.response";
import { Group } from "../../types/common/group.entity";

export abstract class StockGroupRepositoryEntity {
  abstract add(identifier: string, stockGroup: Group): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, stockGroup: Group): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, stockGroupID: string): Promise<ApiResponse<null>>;
}
