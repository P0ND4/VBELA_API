import { ApiResponse } from "../../../../shared/api.response";
import { Handler } from "../../types/handlers";

export abstract class HandlerRepositoryEntity {
  abstract add(identifier: string, handler: Handler): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, handler: Handler): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, handlerID: string): Promise<ApiResponse<null>>;
}
