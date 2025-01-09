import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user.schema';
import { Model } from 'mongoose';
import { Element } from '../../../domain/types';
import { ApiResponse } from '../../../domain/api.response';
import { MenuRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/menu.repository.entity';

@Injectable()
export class MenuRepository extends MenuRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async add(identifier: string, menu: Element): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate({ identifier }, { $push: { menu } }, { new: true })
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(HttpStatus.OK, 'Menu agregado existosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async edit(identifier: string, menu: Element): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'menu.id': menu.id },
          { $set: { 'menu.$': menu } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException(
          'Usuario o menu no encontrada',
          HttpStatus.NOT_FOUND,
        );

      return new ApiResponse(HttpStatus.OK, 'Menu editado exitosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(identifier: string, menuID: string): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $pull: { menu: { id: menuID } } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(HttpStatus.OK, 'Menu removido exitosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
