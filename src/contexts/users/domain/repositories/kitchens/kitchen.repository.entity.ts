import { ApiResponse } from "../../../../shared/api.response";
import { Kitchen } from "../../types";

export abstract class KitchenRepositoryEntity {
  abstract add(identifier: string, kitchen: Kitchen): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, kitchen: Kitchen): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, kitchenID: string): Promise<ApiResponse<null>>;
}
