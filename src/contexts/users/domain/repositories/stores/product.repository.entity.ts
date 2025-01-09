import { ApiResponse } from "../../api.response";
import { Element } from "../../types";

export abstract class ProductRepositoryEntity {
  abstract add(identifier: string, product: Element): Promise<ApiResponse>;
  abstract edit(identifier: string, product: Element): Promise<ApiResponse>;
  abstract remove(identifier: string, productID: string): Promise<ApiResponse>;
}
