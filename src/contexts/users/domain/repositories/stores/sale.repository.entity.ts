import { ApiResponse } from "../../../../shared/api.response";
import { Order } from "../../types";

export abstract class SaleRepositoryEntity {
  abstract add(identifier: string, sale: Order): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, sale: Order): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, saleID: string): Promise<ApiResponse<null>>;
}
