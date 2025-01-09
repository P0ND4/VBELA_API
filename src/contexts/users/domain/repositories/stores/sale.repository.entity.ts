import { ApiResponse } from "../../api.response";
import { Order } from "../../types";

export abstract class SaleRepositoryEntity {
  abstract add(identifier: string, sale: Order): Promise<ApiResponse>;
  abstract edit(identifier: string, sale: Order): Promise<ApiResponse>;
  abstract remove(identifier: string, saleID: string): Promise<ApiResponse>;
}
