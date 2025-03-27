import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { Handler, Movement } from '../../../domain/types';
import { ApiResponse, Status } from '../../../../shared/api.response';
import { MovementRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/movement.repository.entity';

@Injectable()
export class MovementRepository extends MovementRepositoryEntity {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super();
  }

  private updateStockCurrentValue(
    stocks: User['stocks'],
    stockId: string,
    newValue: number,
  ): User['stocks'] {
    return stocks.map((stock) =>
      stock.id === stockId ? { ...stock, currentValue: newValue } : stock,
    );
  }

  private async findUser(identifier: string): Promise<User | null> {
    return this.userModel.findOne({ identifier }).exec();
  }

  async add(
    identifier: string,
    movement: Movement,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.findUser(identifier);
      if (!user)
        return this.errorResponse(
          HttpStatus.NOT_FOUND,
          'Usuario no encontrado.',
        );

      // update currentValue del stock
      const updatedStocks = this.updateStockCurrentValue(
        user.stocks,
        movement.stock.id,
        movement.currentValue,
      );

      // create a new movement
      const updatedMovements = [...user.movements, movement];

      await this.userModel.updateOne(
        { identifier },
        {
          movements: updatedMovements,
          stocks: updatedStocks,
        },
      );

      return this.successResponse(
        HttpStatus.CREATED,
        'Movimiento creado satisfactoriamente.',
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async edit(
    identifier: string,
    id: string,
    movement: Movement,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.findUser(identifier);
      if (!user)
        return this.errorResponse(
          HttpStatus.NOT_FOUND,
          'Usuario no encontrado.',
        );

      const movementIndex = user.movements.findIndex((m) => m.id === id);
      if (movementIndex === -1)
        return this.errorResponse(
          HttpStatus.NOT_FOUND,
          'Movimiento no encontrado.',
        );

      // update movements only (do not edit currentValue)
      const updatedMovements = [...user.movements];
      updatedMovements[movementIndex] = movement;

      await this.userModel.updateOne(
        { identifier },
        { movements: updatedMovements },
      );

      return this.successResponse(
        HttpStatus.OK,
        'Movimiento actualizado satisfactoriamente.',
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(
    identifier: string,
    movementID: string,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.findUser(identifier);
      if (!user)
        return this.errorResponse(
          HttpStatus.NOT_FOUND,
          'Usuario no encontrado.',
        );

      const movementIndex = user.movements.findIndex(
        (m) => m.id === movementID,
      );
      if (movementIndex === -1)
        return this.errorResponse(
          HttpStatus.NOT_FOUND,
          'Movimiento no encontrado.',
        );

      // update movements only (do not edit currentValue)
      const updatedMovements = user.movements.filter(
        (_, i) => i !== movementIndex,
      );

      await this.userModel.updateOne(
        { identifier },
        { movements: updatedMovements },
      );

      return this.successResponse(
        HttpStatus.OK,
        'Movimiento removido satisfactoriamente.',
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  private successResponse(
    status: HttpStatus,
    message: string,
  ): ApiResponse<null> {
    return new ApiResponse(Status.Success, status, message, null);
  }

  private errorResponse(
    status: HttpStatus,
    message: string,
  ): ApiResponse<null> {
    return new ApiResponse(Status.Error, status, message, null);
  }

  private handleError(error: Error): never {
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
