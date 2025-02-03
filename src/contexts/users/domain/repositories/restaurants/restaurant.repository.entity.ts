import { ApiResponse } from "../../../../shared/api.response";
import { Location } from "../../types";

export abstract class RestaurantRepositoryEntity {
  abstract add(identifier: string, restaurant: Location): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, restaurant: Location): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, restaurantID: string): Promise<ApiResponse<null>>;
}
