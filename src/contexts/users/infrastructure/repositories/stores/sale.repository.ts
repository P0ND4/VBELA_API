import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { Order } from '../../../domain/types';
import { ApiResponse, Status } from '../../../../shared/api.response';
import { SaleRepositoryEntity } from 'src/contexts/users/domain/repositories/stores/sale.repository.entity';

@Injectable()
export class SaleRepository extends SaleRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async add(identifier: string, sale: Order): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { sales: sale } },
          { new: true },
        )
        .exec();

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

  async edit(identifier: string, sale: Order): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'sales.id': sale.id },
          { $set: { 'sales.$': sale } },
          { new: true },
        )
        .exec();

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
