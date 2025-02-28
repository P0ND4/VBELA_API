import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { OrderDTO } from '../../../domain/types';
import { ApiResponse, Status } from '../../../../shared/api.response';
import { OrderRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/order.repository.entity';
import { OrderEvents } from '../common/order.events';

@Injectable()
export class OrderRepository extends OrderRepositoryEntity {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly orderEvents: OrderEvents,
  ) {
    super();
  }

  private async discount(dto: OrderDTO) {
    if (!!dto.discounts.length) {
      const discountUpdates = dto.discounts.map((discount) => ({
        updateOne: {
          filter: { 'menu.id': discount.id },
          update: { $inc: { 'menu.$.stock': -discount.quantity } },
        },
      }));

      await this.userModel.bulkWrite(discountUpdates);
    }
  }

  async add(identifier: string, dto: OrderDTO): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { orders: dto.order } },
          { new: true },
        )
        .exec();

      if (user) {
        await this.discount(dto);
        await this.orderEvents.events(dto);
      }

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

  async edit(
    identifier: string,
    id: string,
    dto: OrderDTO,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'orders.id': id },
          { $set: { 'orders.$': dto.order } },
          { new: true },
        )
        .exec();

      if (user) {
        await this.discount(dto);
        await this.orderEvents.events(dto);
      }

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
