import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { KitchenRepositoryEntity } from '../../../domain/repositories/kitchens/kitchen.repository.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { Kitchen, KitchenDTO } from '../../../domain/types';
import { ApiResponse, Status } from '../../../../shared/api.response';

@Injectable()
export class KitchenRepository extends KitchenRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async add(identifier: string, dto: KitchenDTO): Promise<ApiResponse<null>> {
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

      const orderIndex = user.orders.findIndex(order => order.id === dto.order.id);

      if (orderIndex !== -1) user.orders[orderIndex] = dto.order;
      else user.orders.push(dto.order);
      user.kitchens.push(dto.kitchen);

      await user.save();

      return new ApiResponse(
        Status.Success,
        HttpStatus.CREATED,
        'Cocina agregada exitosamente.',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async edit(identifier: string, id: string, kitchen: Kitchen): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'kitchens.id': id },
          { $set: { 'kitchens.$': kitchen } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user
          ? 'Cocina editada exitosamente.'
          : 'Usuario o cocina no encontrada.',
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
    kitchenID: string,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $pull: { kitchens: { id: kitchenID } } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user ? 'Cocina removida exitosamente.' : 'Usuario no encontrado.',
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
