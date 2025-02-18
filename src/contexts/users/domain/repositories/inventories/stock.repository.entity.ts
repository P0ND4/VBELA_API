import { ApiResponse } from "../../../../shared/api.response";
import { Stock, Movement } from "../../types";

export abstract class StockRepositoryEntity {
  abstract add(identifier: string, stock: Stock): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, stock: Stock): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, stockID: string): Promise<ApiResponse<null>>;
  abstract addMovement(identifier: string, movement: Movement): Promise<ApiResponse<null>>;
  abstract editMovement(identifier: string, movement: Movement): Promise<ApiResponse<null>>;
  abstract removeMovement(identifier: string, movementID: string): Promise<ApiResponse<null>>;
}
