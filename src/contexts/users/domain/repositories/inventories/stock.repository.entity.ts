import { ApiResponse } from "../../api.response";
import { Stock } from "../../types";

export abstract class StockRepositoryEntity {
  abstract add(identifier: string, stock: Stock): Promise<ApiResponse>;
  abstract edit(identifier: string, stock: Stock): Promise<ApiResponse>;
  abstract remove(identifier: string, stockID: string): Promise<ApiResponse>;
}
