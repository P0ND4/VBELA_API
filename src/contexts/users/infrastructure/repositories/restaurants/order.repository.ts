import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { Discount, OrderDTO } from '../../../domain/types';
import { ApiResponse, Status } from '../../../../shared/api.response';
import { OrderRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/order.repository.entity';
import { MovementEvents } from '../common/movement.events';

@Injectable()
export class OrderRepository extends OrderRepositoryEntity {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly movementEvents: MovementEvents,
  ) {
    super();
  }

  private async discount(discounts: Discount[]) {
    if (!!discounts.length) {
      const discountUpdates = discounts.map((discount) => ({
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
      const user = await this.userModel.findOne({ identifier }).exec();

      if (!user) {
        return new ApiResponse(
          Status.Error,
          HttpStatus.NO_CONTENT,
          'Usuario no encontrado.',
          null,
        );
      }

      // Add the new order
      user.orders.push(dto.order);

      // Update portions
      const portionsMap = new Map(
        dto.portions.map((portion) => [portion.id, portion]),
      );

      user.portions = user.portions.map((portion) => {
        const found = portionsMap.get(portion.id);
        return found || portion;
      });

      await user.save();

      await Promise.all([
        await this.discount(dto.discounts),
        await this.movementEvents.events(identifier, dto.movements),
      ]);

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
      const user = await this.userModel.findOne({ identifier }).exec();

      if (!user) {
        return new ApiResponse(
          Status.Error,
          HttpStatus.NOT_FOUND,
          'Usuario no encontrado.',
          null,
        );
      }

      const orderIndex = user.orders.findIndex((o) => o.id === id);
      if (orderIndex === -1) {
        return new ApiResponse(
          Status.Error,
          HttpStatus.NOT_FOUND,
          'Orden no encontrada.',
          null,
        );
      }

      // Update the order
      user.orders[orderIndex] = dto.order;

      // Update portions
      const portionsMap = new Map(
        dto.portions.map((portion) => [portion.id, portion]),
      );

      user.portions = user.portions.map((portion) => {
        const found = portionsMap.get(portion.id);
        return found || portion;
      });

      await user.save();

      await Promise.all([
        await this.discount(dto.discounts),
        await this.movementEvents.events(identifier, dto.movements),
      ]);

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
