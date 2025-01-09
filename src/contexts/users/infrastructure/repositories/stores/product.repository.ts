import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user.schema';
import { Model } from 'mongoose';
import { Element } from '../../../domain/types';
import { ApiResponse } from '../../../domain/api.response';
import { ProductRepositoryEntity } from 'src/contexts/users/domain/repositories/stores/product.repository.entity';

@Injectable()
export class ProductRepository extends ProductRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async add(identifier: string, product: Element): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { products: product } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(HttpStatus.OK, 'Producto agregado existosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async edit(identifier: string, product: Element): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'products.id': product.id },
          { $set: { 'products.$': product } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException(
          'Usuario o product no encontrada',
          HttpStatus.NOT_FOUND,
        );

      return new ApiResponse(HttpStatus.OK, 'Producto editado exitosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(identifier: string, productID: string): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $pull: { products: { id: productID } } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(HttpStatus.OK, 'Producto removido exitosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
