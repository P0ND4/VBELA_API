import { ApiResponse } from "../../api.response";
import { Kitchen } from "../../types";

export abstract class KitchenRepositoryEntity {
  abstract add(identifier: string, kitchen: Kitchen): Promise<ApiResponse>;
  abstract edit(identifier: string, kitchen: Kitchen): Promise<ApiResponse>;
  abstract remove(identifier: string, kitchenID: string): Promise<ApiResponse>;
}
