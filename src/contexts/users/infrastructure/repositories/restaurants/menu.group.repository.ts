import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { ApiResponse, Status } from '../../../../shared/api.response';
import { Group } from 'src/contexts/users/domain/types/common/group.entity';
import { MenuGroupRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/menu.group.repository.entity';

@Injectable()
export class MenuGroupRepository extends MenuGroupRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async add(identifier: string, group: Group): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { menuGroup: group } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.CREATED : HttpStatus.NO_CONTENT,
        user ? 'Grupo de menu creado exitosamente.' : 'Usuario no encontrado.',
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

      // Updated menu group
      user.menuGroup = user.menuGroup.map((g) => (g.id === id ? group : g));

      // Update subcategories and category
      user.menu = user.menu.map((menu) => ({
        ...menu,
        subcategories: menu.subcategories.filter(
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
          ? 'Grupo de menu actualizado exitosamente.'
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

      // Remove menu group
      user.menuGroup = user.menuGroup.filter((group) => group.id !== groupID);

      // Remove subcategories and category
      user.menu = user.menu.map((menu) => ({
        ...menu,
        categories: menu.categories.filter((c) => c !== groupID),
        subcategories: menu.subcategories.filter((s) => s.category !== groupID),
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
