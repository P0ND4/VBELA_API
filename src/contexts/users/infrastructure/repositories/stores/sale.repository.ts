import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { ClientSession, Model } from 'mongoose';
import { ApiResponse, Status } from '../../../../shared/api.response';
import { SaleRepositoryEntity } from 'src/contexts/users/domain/repositories/stores/sale.repository.entity';
import { OrderDTO } from 'src/contexts/users/domain/types';
import { OrderEvents } from '../common/order.events';

@Injectable()
export class SaleRepository extends SaleRepositoryEntity {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly orderEvents: OrderEvents,
  ) {
    super();
  }

  async add(identifier: string, dto: OrderDTO): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { sales: dto.order } },
          { new: true },
        )
        .exec();

      if (user) {
        if (!!dto.discounts.length) {
          const discountUpdates = dto.discounts.map((discount) => ({
            updateOne: {
              filter: { 'products.id': discount.id },
              update: { $inc: { 'products.$.stock': -discount.quantity } },
            },
          }));

          await this.userModel.bulkWrite(discountUpdates);
        }

        await this.orderEvents.events(dto);
      }

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

  async edit(identifier: string, dto: OrderDTO): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'sales.id': dto.order.id },
          { $set: { 'sales.$': dto.order } },
          { new: true },
        )
        .exec();

      if (user) await this.orderEvents.events(dto);

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
