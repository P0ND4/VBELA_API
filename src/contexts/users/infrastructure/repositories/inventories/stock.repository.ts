import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { Stock } from '../../../domain/types';
import { ApiResponse, Status } from '../../../../shared/api.response';
import { StockRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/stock.repository.entity';

@Injectable()
export class StockRepository extends StockRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async add(identifier: string, stock: Stock): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { stocks: stock } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.CREATED : HttpStatus.NO_CONTENT,
        user ? 'Stock agregada exitosamente.' : 'Usuario no encontrado.',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async edit(identifier: string, stock: Stock): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'stocks.id': stock.id },
          { $set: { 'stocks.$': stock } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user ? 'Stock editado exitosamente.' : 'Usuario o stock no encontrado.',
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
    stockID: string,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $pull: { stocks: { id: stockID } } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user ? 'Stock removido exitosamente.' : 'Usuario no encontrado.',
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
