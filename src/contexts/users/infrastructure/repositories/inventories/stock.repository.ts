import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user.schema';
import { Model } from 'mongoose';
import { Stock } from '../../../domain/types';
import { ApiResponse } from '../../../domain/api.response';
import { StockRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/stock.repository.entity';

@Injectable()
export class StockRepository extends StockRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async add(identifier: string, stock: Stock): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { stocks: stock } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(HttpStatus.OK, 'Stock agregado existosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async edit(identifier: string, stock: Stock): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'stocks.id': stock.id },
          { $set: { 'stocks.$': stock } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException(
          'Usuario o stock no encontrada',
          HttpStatus.NOT_FOUND,
        );

      return new ApiResponse(HttpStatus.OK, 'Stock editado exitosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(identifier: string, stockID: string): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $pull: { stocks: { id: stockID } } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(HttpStatus.OK, 'Stock removido exitosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
