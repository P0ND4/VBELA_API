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

  async tip(identifier: string, tip: number): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate({ identifier }, { tip }, { new: true })
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user ? 'Propina actualizado exitosamente' : 'Usuario no encontrado',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async tax(identifier: string, tax: number): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate({ identifier }, { tax }, { new: true })
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user ? 'Impuesto actualizado exitosamente' : 'Usuario no encontrado',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async initialBasis(
    identifier: string,
    initialBasis: number,
  ): Promise<ApiResponse<null>> {
    try {
      const user = await this.userModel
        .findOneAndUpdate({ identifier }, { initialBasis }, { new: true })
        .exec();

      return new ApiResponse(
        user ? Status.Success : Status.Error,
        user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        user
          ? 'Base inicial actualizado exitosamente'
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
}
