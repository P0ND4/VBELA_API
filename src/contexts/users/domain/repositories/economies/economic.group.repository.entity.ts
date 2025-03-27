import { ApiResponse } from "../../../../shared/api.response";
import { EconomicGroup } from "../../types";

export abstract class EconomicGroupRepositoryEntity {
    abstract add(identifier: string, economicGroup: EconomicGroup): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, economicGroup: EconomicGroup): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, economicGroupId: string): Promise<ApiResponse<null>>;
}
