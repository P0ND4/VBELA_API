import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { ClientSession, Model } from 'mongoose';
import { ApiResponse, Status } from '../../../../shared/api.response';
import { SaleRepositoryEntity } from 'src/contexts/users/domain/repositories/stores/sale.repository.entity';
import { Discount, OrderDTO } from 'src/contexts/users/domain/types';
import { MovementEvents } from '../common/movement.events';

@Injectable()
export class SaleRepository extends SaleRepositoryEntity {
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
          filter: { 'products.id': discount.id },
          update: { $inc: { 'products.$.stock': -discount.quantity } },
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

      // Add the new Sale
      user.sales.push(dto.order);

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
        user ? 'Venta agregada exitosamente.' : 'Usuario no encontrado.',
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

      const saleIndex = user.sales.findIndex((o) => o.id === id);
      if (saleIndex === -1) {
        return new ApiResponse(
          Status.Error,
          HttpStatus.NOT_FOUND,
          'Venta no encontrada.',
          null,
        );
      }

      // Update the order
      user.sales[saleIndex] = dto.order;

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
        user ? 'Venta editada exitosamente.' : 'Usuario o venta no encontrada.',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(identifier: string, saleID: string): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $pull: { sales: { id: saleID } } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user ? 'Venta removida exitosamente.' : 'Usuario no encontrado.',
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
