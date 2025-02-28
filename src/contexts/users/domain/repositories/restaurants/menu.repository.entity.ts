import { ApiResponse } from "../../../../shared/api.response";
import { Element } from "../../types";

export abstract class MenuRepositoryEntity {
  abstract add(identifier: string, menu: Element): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, menu: Element): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, menuID: string): Promise<ApiResponse<null>>;
}
