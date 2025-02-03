import { ApiResponse } from "../../../../shared/api.response";
import { Element } from "../../types";

export abstract class ProductRepositoryEntity {
  abstract add(identifier: string, product: Element): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, product: Element): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, productID: string): Promise<ApiResponse<null>>;
}
