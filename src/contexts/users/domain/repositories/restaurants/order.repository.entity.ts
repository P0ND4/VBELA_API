import { ApiResponse } from "../../../../shared/api.response";
import { OrderDTO } from "../../types";

export abstract class OrderRepositoryEntity {
  abstract add(identifier: string, order: OrderDTO): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, order: OrderDTO): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, orderID: string): Promise<ApiResponse<null>>;
}
