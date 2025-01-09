import { ApiResponse } from "../../api.response";
import { Element } from "../../types";

export abstract class MenuRepositoryEntity {
  abstract add(identifier: string, menu: Element): Promise<ApiResponse>;
  abstract edit(identifier: string, menu: Element): Promise<ApiResponse>;
  abstract remove(identifier: string, menuID: string): Promise<ApiResponse>;
}
