import { ApiResponse } from "../../api.response";
import { Location } from "../../types";

export abstract class RestaurantRepositoryEntity {
  abstract add(identifier: string, restaurant: Location): Promise<ApiResponse>;
  abstract edit(identifier: string, restaurant: Location): Promise<ApiResponse>;
  abstract remove(identifier: string, restaurantID: string): Promise<ApiResponse>;
}
