import { ApiResponse } from "../../../../shared/api.response";
import { Stock } from "../../types";

export abstract class StockRepositoryEntity {
  abstract add(identifier: string, stock: Stock): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, stock: Stock): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, stockID: string): Promise<ApiResponse<null>>;
}
