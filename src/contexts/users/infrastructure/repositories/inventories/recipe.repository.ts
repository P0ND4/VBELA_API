import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { Recipe } from '../../../domain/types';
import { ApiResponse, Status } from '../../../../shared/api.response';
import { RecipeRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/recipe.repository.entity';

@Injectable()
export class RecipeRepository extends RecipeRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async add(identifier: string, recipe: Recipe): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { recipes: recipe } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.CREATED : HttpStatus.NO_CONTENT,
        user ? 'Receta agregada exitosamente.' : 'Usuario no encontrado.',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async edit(identifier: string, recipe: Recipe): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'recipes.id': recipe.id },
          { $set: { 'recipes.$': recipe } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user
          ? 'Receta editada exitosamente.'
          : 'Usuario o receta no encontrada.',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(identifier: string, recipeID: string): Promise<ApiResponse<null>> {
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

      // Remove recipe
      user.recipes = user.recipes.filter(recipe => recipe.id !== recipeID);

      // Remove recipe from products
      user.products = user.products.map(product => ({
        ...product,
        packageIDS: product.packageIDS?.filter(id => id !== recipeID),
      }));

      // Remove recipe from menu
      user.menu = user.menu.map(menuItem => ({
        ...menuItem,
        packageIDS: menuItem.packageIDS?.filter(id => id !== recipeID),
      }));

      await user.save();

      return new ApiResponse(
        Status.Success,
        HttpStatus.OK,
        'Receta y referencias eliminadas exitosamente.',
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

