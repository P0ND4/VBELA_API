import { ApiResponse } from "../../../../shared/api.response";
import { ActivityDTO, Portion } from "../../types";

export abstract class PortionRepositoryEntity {
  abstract addActivity(identifier: string, dto: ActivityDTO): Promise<ApiResponse<null>>;
  abstract add(identifier: string, portion: Portion): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, portion: Portion): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, portion: string): Promise<ApiResponse<null>>;
}
