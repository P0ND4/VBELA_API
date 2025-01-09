import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/users/domain/api.response';
import { RestaurantRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/restaurant.repository.entity';
import { Location } from '../../domain/types';

@Injectable()
export class RestaurantUseCase {
  constructor(private readonly restaurantRepository: RestaurantRepositoryEntity) {}

  async add(identifier: string, restaurant: Location): Promise<ApiResponse> {
    return await this.restaurantRepository.add(identifier, restaurant);
  }

  async edit(identifier: string, restaurant: Location): Promise<ApiResponse> {
    return await this.restaurantRepository.edit(identifier, restaurant);
  }

  async remove(identifier: string, restaurantID: string): Promise<ApiResponse> {
    return await this.restaurantRepository.remove(identifier, restaurantID);
  }
}
