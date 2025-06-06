import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { RestaurantRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/restaurant.repository.entity';
import { Location } from '../../domain/types';

@Injectable()
export class RestaurantUseCase {
  constructor(private readonly restaurantRepository: RestaurantRepositoryEntity) {}

  async add(identifier: string, restaurant: Location): Promise<ApiResponse<null>> {
    return await this.restaurantRepository.add(identifier, restaurant);
  }

  async edit(identifier: string, id: string, restaurant: Location): Promise<ApiResponse<null>> {
    return await this.restaurantRepository.edit(identifier, id, restaurant);
  }

  async remove(identifier: string, restaurantID: string): Promise<ApiResponse<null>> {
    return await this.restaurantRepository.remove(identifier, restaurantID);
  }
}
