import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { Inventory } from '../../../domain/types';
import { ApiResponse, Status } from '../../../../shared/api.response';
import { InventoryRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/inventory.repository.entity';

@Injectable()
export class InventoryRepository extends InventoryRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async add(
    identifier: string,
    inventory: Inventory,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { inventories: inventory } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.CREATED : HttpStatus.NO_CONTENT,
        user ? 'Inventario creado exitosamente.' : 'Usuario no encontrado.',
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
    inventory: Inventory,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'inventories.id': inventory.id },
          { $set: { 'inventories.$': inventory } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user
          ? 'Inventario actualizado exitosamente.'
          : 'Usuario o inventario no encontrado.',
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
    inventoryID: string,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $pull: { inventories: { id: inventoryID } } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user ? 'Inventario eliminado exitosamente.' : 'Usuario no encontrado.',
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
