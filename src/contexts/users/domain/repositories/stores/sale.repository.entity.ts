import { ApiResponse } from "../../../../shared/api.response";
import { OrderDTO } from "../../types";

export abstract class SaleRepositoryEntity {
  abstract add(identifier: string, sale: OrderDTO): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, sale: OrderDTO): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, saleID: string): Promise<ApiResponse<null>>;
}
