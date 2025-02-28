import { ApiResponse } from "../../../../shared/api.response";
import { Inventory } from "../../types";

export abstract class InventoryRepositoryEntity {
  abstract add(identifier: string, inventory: Inventory): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, inventory: Inventory): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, inventoryID: string): Promise<ApiResponse<null>>;
}
