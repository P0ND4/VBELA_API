import { ApiResponse } from "../../../../shared/api.response";
import { Order } from "../../types";

export abstract class OrderRepositoryEntity {
  abstract add(identifier: string, order: Order): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, order: Order): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, orderID: string): Promise<ApiResponse<null>>;
}
