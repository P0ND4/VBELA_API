import { ApiResponse } from "../../../../shared/api.response";
import { Economy } from "../../types";

export abstract class EconomyRepositoryEntity {
  abstract add(identifier: string, economy: Economy): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, economy: Economy): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, economyID: string): Promise<ApiResponse<null>>;
}
