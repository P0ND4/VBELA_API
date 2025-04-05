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
    id: string,
    inventory: Inventory,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'inventories.id': id },
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
      const user = await this.userModel.findOne({ identifier }).exec();

      if (!user) {
        return new ApiResponse(
          Status.Error,
          HttpStatus.NO_CONTENT,
          'Usuario no encontrado.',
          null,
        );
      }

      // Remove inventory
      user.inventories = user.inventories.filter(inventory => inventory.id !== inventoryID);

      // Remove stocks by inventoryID
      const stockIDS = user.stocks
        .filter(stock => stock.inventoryID === inventoryID)
        .map(stock => stock.id);
      user.stocks = user.stocks.filter(stock => stock.inventoryID !== inventoryID);

      // Remove recipes by inventoryID
      const recipeIDS = user.recipes
        .filter(recipe => recipe.inventoryID === inventoryID)
        .map(recipe => recipe.id);
      user.recipes = user.recipes.filter(recipe => recipe.inventoryID !== inventoryID);

      // Remove portions
      user.portions = user.portions.filter(portion => portion.inventoryID !== inventoryID);

      // Remove portionGroup
      user.portionGroup = user.portionGroup.filter(group => group.ownerID !== inventoryID);

      // Remove stockGroup
      user.stockGroup = user.stockGroup.filter(group => group.ownerID !== inventoryID);

      // Remove recipeGroup
      user.recipeGroup = user.recipeGroup.filter(group => group.ownerID !== inventoryID);

      // Remove stocks from products
      user.products = user.products.map(product => ({
        ...product,
        stockIDS: product.stockIDS?.filter(id => !stockIDS.includes(id)),
      }));

      // Remove recipes from products
      user.products = user.products.map(product => ({
        ...product,
        packageIDS: product.packageIDS?.filter(id => !recipeIDS.includes(id)),
      }));

      // Remove stocks from menu
      user.menu = user.menu.map(menuItem => ({
        ...menuItem,
        stockIDS: menuItem.stockIDS?.filter(id => !stockIDS.includes(id)),
      }));

      // Remove recipes from menu
      user.menu = user.menu.map(menuItem => ({
        ...menuItem,
        packageIDS: menuItem.packageIDS?.filter(id => !recipeIDS.includes(id)),
      }));

      // Remove inventory from restaurants
      user.restaurants = user.restaurants.map(restaurant => ({
        ...restaurant,
        inventories: restaurant.inventories.filter(id => id !== inventoryID),
      }));

      // Remove inventory from stores
      user.stores = user.stores.map(store => ({
        ...store,
        inventories: store.inventories.filter(id => id !== inventoryID),
      }));

      await user.save();

      return new ApiResponse(
        Status.Success,
        HttpStatus.OK,
        'Inventario y referencias eliminadas exitosamente.',
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
