import { ApiResponse } from "../../../../shared/api.response";
import { Kitchen, KitchenDTO } from "../../types";

export abstract class KitchenRepositoryEntity {
  abstract add(identifier: string, dto: KitchenDTO): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, kitchen: Kitchen): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, kitchenID: string): Promise<ApiResponse<null>>;
}
