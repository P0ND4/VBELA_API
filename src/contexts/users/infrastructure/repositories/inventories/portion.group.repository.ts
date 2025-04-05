import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { ApiResponse, Status } from '../../../../shared/api.response';
import { PortionGroupRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/portion.group.repository.entity';
import { Group } from 'src/contexts/users/domain/types/common/group.entity';

@Injectable()
export class PortionGroupRepository extends PortionGroupRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async add(identifier: string, group: Group): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { portionGroup: group } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.CREATED : HttpStatus.NO_CONTENT,
        user
          ? 'Grupo de porciones creado exitosamente.'
          : 'Usuario no encontrado.',
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
    group: Group,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel.findOne({ identifier }).exec();

      // Edit product group
      user.portionGroup = user.portionGroup.map((g) => (g.id === id ? group : g));

      // Update subcategories and category
      user.portions = user.portions.map((recipe) => ({
        ...recipe,
        subcategories: recipe.subcategories.filter(
          (sub) =>
            sub.category !== group.id ||
            group.subcategories.some((s) => s.id === sub.subcategory),
        ),
      }));

      await user.save();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user
          ? 'Grupo de porciones actualizado exitosamente.'
          : 'Usuario o grupo no encontrado.',
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
    groupID: string,
  ): Promise<ApiResponse<null>> {
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

      // Remove product group
      user.portionGroup = user.portionGroup.filter(
        (group) => group.id !== groupID,
      );

      // Remove subcategories and category
      user.portions = user.portions.map((recipe) => ({
        ...recipe,
        categories: recipe.categories.filter((c) => c !== groupID),
        subcategories: recipe.subcategories.filter(
          (s) => s.category !== groupID,
        ),
      }));

      await user.save();

      return new ApiResponse(
        Status.Success,
        HttpStatus.OK,
        'Grupo y referencias eliminadas exitosamente.',
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
