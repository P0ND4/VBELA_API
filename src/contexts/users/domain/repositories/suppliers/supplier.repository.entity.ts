import { ApiResponse } from "../../../../shared/api.response";
import { Supplier } from "../../types";

export abstract class SupplierRepositoryEntity {
  abstract add(identifier: string, supplier: Supplier): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, supplier: Supplier): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, supplierID: string): Promise<ApiResponse<null>>;
}
