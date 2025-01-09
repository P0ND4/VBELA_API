import { ApiResponse } from "../../api.response";
import { Order } from "../../types";

export abstract class OrderRepositoryEntity {
  abstract add(identifier: string, order: Order): Promise<ApiResponse>;
  abstract edit(identifier: string, order: Order): Promise<ApiResponse>;
  abstract remove(identifier: string, orderID: string): Promise<ApiResponse>;
}
