import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { Movement, Stock } from '../../../domain/types';
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
        user ? 'Stock agregado exitosamente.' : 'Usuario no encontrado.',
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
      const user = await this.userModel.findOne({ identifier }).exec();

      if (!user) {
        return new ApiResponse(
          Status.Error,
          HttpStatus.NO_CONTENT,
          'Usuario no encontrado.',
          null,
        );
      }

      // Remove stock
      user.stocks = user.stocks.filter((stock) => stock.id !== stockID);

      // Remove stock from products
      user.products = user.products.map((product) => ({
        ...product,
        stockIDS: product.stockIDS?.filter((id) => id !== stockID),
      }));

      // Remove stock from menu
      user.menu = user.menu.map((menuItem) => ({
        ...menuItem,
        stockIDS: menuItem.stockIDS?.filter((id) => id !== stockID),
      }));

      // Remove stock from recipes
      user.recipes = user.recipes.map((recipe) => ({
        ...recipe,
        ingredients: recipe.ingredients.filter(
          (ingredient) => ingredient.id !== stockID,
        ),
      }));

      await user.save();

      return new ApiResponse(
        Status.Success,
        HttpStatus.OK,
        'Stock y referencias eliminadas exitosamente.',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private updateStockMovement(
    user: User,
    movement: Movement,
    updater: (stock: Stock, movement: Movement) => Stock,
  ) {
    user.stocks = user.stocks.map(stock => {
      return stock.id === movement.stockID ? updater(stock, movement) : stock;
    });
  }

  async addMovement(
    identifier: string,
    movement: Movement,
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

      this.updateStockMovement(user, movement, (stock, movement) => ({
        ...stock,
        currentValue: movement.currentValue,
        movements: [...stock.movements, movement],
      }));

      await user.save();
      return new ApiResponse(
        Status.Success,
        HttpStatus.OK,
        'Movimiento agregado exitosamente.',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editMovement(
    identifier: string,
    movement: Movement,
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

      this.updateStockMovement(user, movement, (stock, movement) => ({
        ...stock,
        movements: stock.movements.map(m => (m.id === movement.id ? movement : m)),
      }));

      await user.save();
      return new ApiResponse(
        Status.Success,
        HttpStatus.OK,
        'Movimiento editado exitosamente.',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeMovement(
    identifier: string,
    movementID: string,
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

      user.stocks = user.stocks.map(stock => ({
        ...stock,
        movements: stock.movements.filter(m => m.id !== movementID),
      }));

      await user.save();
      return new ApiResponse(
        Status.Success,
        HttpStatus.OK,
        'Movimiento eliminado exitosamente.',
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
