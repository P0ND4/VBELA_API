import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user.schema';
import { Model } from 'mongoose';
import { Location } from '../../../domain/types';
import { ApiResponse } from '../../../domain/api.response';
import { RestaurantRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/restaurant.repository.entity';

@Injectable()
export class RestaurantRepository extends RestaurantRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async add(identifier: string, restaurant: Location): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { restaurants: restaurant } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(
        HttpStatus.OK,
        'Restaurante agregado existosamente',
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async edit(identifier: string, restaurant: Location): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'restaurants.id': restaurant.id },
          { $set: { 'restaurants.$': restaurant } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException(
          'Usuario o restaurante no encontrada',
          HttpStatus.NOT_FOUND,
        );

      return new ApiResponse(HttpStatus.OK, 'Restaurante editado exitosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(identifier: string, restaurantID: string): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $pull: { restaurants: { id: restaurantID } } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(HttpStatus.OK, 'Restaurante removido exitosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
