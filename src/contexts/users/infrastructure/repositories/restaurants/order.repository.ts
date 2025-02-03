import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { Order } from '../../../domain/types';
import { ApiResponse, Status } from '../../../../shared/api.response';
import { OrderRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/order.repository.entity';

@Injectable()
export class OrderRepository extends OrderRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async add(identifier: string, order: Order): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { orders: order } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.CREATED : HttpStatus.NO_CONTENT,
        user ? 'Orden agregada exitosamente.' : 'Usuario no encontrado.',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async edit(identifier: string, order: Order): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'orders.id': order.id },
          { $set: { 'orders.$': order } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user ? 'Orden editada exitosamente.' : 'Usuario u orden no encontrada.',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(
    identifier: string,
    orderID: string,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $pull: { orders: { id: orderID } } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user ? 'Orden removida exitosamente.' : 'Usuario no encontrado.',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
