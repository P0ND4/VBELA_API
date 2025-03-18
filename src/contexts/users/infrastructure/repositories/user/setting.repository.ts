import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../schema/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SettingRepositoryEntity } from 'src/contexts/users/domain/repositories/user/setting.repository.entity';
import { ApiResponse, Status } from 'src/contexts/shared/api.response';
import {
  EconomicGroup,
  InvoiceInformation,
  PaymentMethods,
} from 'src/contexts/users/domain/types';

@Injectable()
export class SettingRepository extends SettingRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async darkMode(
    identifier: string,
    darkMode: boolean,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate({ identifier }, { darkMode }, { new: true })
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user ? 'Modo oscuro actualizado exitosamente' : 'Usuario no encontrado',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async invoiceInformation(
    identifier: string,
    invoiceInformation: InvoiceInformation,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate({ identifier }, { invoiceInformation }, { new: true })
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user
          ? 'Información de la factura actualizada exitosamente'
          : 'Usuario no encontrado',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async color(identifier: string, color: number): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate({ identifier }, { color }, { new: true })
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user ? 'Color actualizado exitosamente' : 'Usuario no encontrado',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addPaymentMethods(
    identifier: string,
    paymentMethods: PaymentMethods,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { paymentMethods } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.CREATED : HttpStatus.NO_CONTENT,
        user
          ? 'Métodos de pago actualizados exitosamente'
          : 'Usuario no encontrado',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editPaymentMethods(
    identifier: string,
    id: string,
    paymentMethods: PaymentMethods,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'paymentMethods.id': id },
          { $set: { 'paymentMethods.$': paymentMethods } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user
          ? 'Método de pago editado exitosamente'
          : 'Usuario o método de pago no encontrado',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removePaymentMethods(
    identifier: string,
    paymentMethodsID: string,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $pull: { paymentMethods: { id: paymentMethodsID } } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user ? 'Método de pago removido exitosamente' : 'Usuario no encontrado',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addEconomicGroup(
    identifier: string,
    economicGroup: EconomicGroup,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { economicGroup } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.CREATED : HttpStatus.NO_CONTENT,
        user
          ? 'Categoría de ingreso/egreso actualizados exitosamente'
          : 'Usuario no encontrado',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editEconomicGroup(
    identifier: string,
    id: string,
    economicGroup: EconomicGroup,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'economicGroup.id': id },
          { $set: { 'economicGroup.$': economicGroup } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user
          ? 'Categoría de ingreso/egreso editado exitosamente'
          : 'Usuario o categoría de ingreso/egreso no encontrado',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeEconomicGroup(
    identifier: string,
    economicGroupID: string,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $pull: { economicGroup: { id: economicGroupID } } },
          { new: true },
        )
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user
          ? 'Categoría de ingreso/egreso removido exitosamente'
          : 'Usuario no encontrado',
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
