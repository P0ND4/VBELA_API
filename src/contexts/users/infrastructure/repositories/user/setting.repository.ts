import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SettingRepositoryEntity } from 'src/contexts/users/domain/repositories/user/setting.repository.entity';
import { ApiResponse } from 'src/contexts/users/domain/api.response';
import {
  InvoiceInformation,
  PaymentMethods,
} from 'src/contexts/users/domain/types';

@Injectable()
export class SettingRepository extends SettingRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async darkMode(identifier: string, darkMode: boolean): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate({ identifier }, { darkMode }, { new: true })
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(
        HttpStatus.OK,
        'Modo oscuro actualizado exitosamente',
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
  ): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate({ identifier }, { invoiceInformation }, { new: true })
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(
        HttpStatus.OK,
        'Información de la factura actualizado exitosamente',
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async coin(identifier: string, coin: string): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate({ identifier }, { coin }, { new: true })
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(HttpStatus.OK, 'Moneda actualizado exitosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async color(identifier: string, color: number): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate({ identifier }, { color }, { new: true })
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(HttpStatus.OK, 'Color actualizado exitosamente');
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
  ): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $push: { paymentMethods } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(
        HttpStatus.OK,
        'Métodos de pago actualizado exitosamente',
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
    paymentMethods: PaymentMethods,
  ): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier, 'paymentMethods.id': paymentMethods.id },
          { $set: { 'paymentMethods.$': paymentMethods } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException(
          'Usuario o método de pago no encontrado',
          HttpStatus.NOT_FOUND,
        );

      return new ApiResponse(HttpStatus.OK, 'Método de pago editado exitosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removePaymentMethods(identifier: string, paymentMethodsID: string): Promise<ApiResponse> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { identifier },
          { $pull: { paymentMethods: { id: paymentMethodsID } } },
          { new: true },
        )
        .exec();

      if (!user)
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return new ApiResponse(HttpStatus.OK, 'Método de pago removido exitosamente');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
