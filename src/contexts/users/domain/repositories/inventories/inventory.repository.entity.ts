import { ApiResponse } from "../../api.response";
import { Inventory } from "../../types";

export abstract class InventoryRepositoryEntity {
  abstract add(identifier: string, inventory: Inventory): Promise<ApiResponse>;
  abstract edit(identifier: string, inventory: Inventory): Promise<ApiResponse>;
  abstract remove(identifier: string, inventoryID: string): Promise<ApiResponse>;
}
