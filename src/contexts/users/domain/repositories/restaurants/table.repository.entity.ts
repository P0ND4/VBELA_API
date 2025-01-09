import { ApiResponse } from "../../api.response";
import { Table } from "../../types";

export abstract class TableRepositoryEntity {
  abstract add(identifier: string, table: Table): Promise<ApiResponse>;
  abstract edit(identifier: string, table: Table): Promise<ApiResponse>;
  abstract remove(identifier: string, tableID: string): Promise<ApiResponse>;
}
