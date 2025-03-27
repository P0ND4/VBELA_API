import { ApiResponse } from "../../../../shared/api.response";
import { Movement } from "../../types";

export abstract class MovementRepositoryEntity {
  abstract add(identifier: string, movement: Movement): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, movement: Movement): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, movementID: string): Promise<ApiResponse<null>>;
}
