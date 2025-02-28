import { ApiResponse } from "../../../../shared/api.response";
import { Table } from "../../types";

export abstract class TableRepositoryEntity {
  abstract add(identifier: string, table: Table): Promise<ApiResponse<null>>;
  abstract addMultiple(identifier: string, tables: Table[]): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, table: Table): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, tableID: string): Promise<ApiResponse<null>>;
}
