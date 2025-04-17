import { Injectable } from '@nestjs/common';
import { SettingRepositoryEntity } from 'src/contexts/users/domain/repositories/user/setting.repository.entity';
import { ApiResponse } from 'src/contexts/shared/api.response';
import {
  EconomicGroup,
  InvoiceInformation,
  PaymentMethods,
} from 'src/contexts/users/domain/types';

@Injectable()
export class SettingUseCase {
  constructor(private readonly settingRepository: SettingRepositoryEntity) {}

  async darkMode(
    identifier: string,
    darkMode: boolean,
  ): Promise<ApiResponse<null>> {
    return await this.settingRepository.darkMode(identifier, darkMode);
  }

  async invoiceInformation(
    identifier: string,
    invoiceInformation: InvoiceInformation,
  ): Promise<ApiResponse<null>> {
    return await this.settingRepository.invoiceInformation(
      identifier,
      invoiceInformation,
    );
  }

  async color(identifier: string, color: number): Promise<ApiResponse<null>> {
    return await this.settingRepository.color(identifier, color);
  }

  async tip(identifier: string, tip: number): Promise<ApiResponse<null>> {
    return await this.settingRepository.tip(identifier, tip);
  }

  async tax(identifier: string, tax: number): Promise<ApiResponse<null>> {
    return await this.settingRepository.tax(identifier, tax);
  }

  async initialBasis(identifier: string, initialBasis: number): Promise<ApiResponse<null>> {
    return await this.settingRepository.initialBasis(identifier, initialBasis);
  }

  async addPaymentMethods(
    identifier: string,
    paymentMethods: PaymentMethods,
  ): Promise<ApiResponse<null>> {
    return await this.settingRepository.addPaymentMethods(
      identifier,
      paymentMethods,
    );
  }

  async editPaymentMethods(
    identifier: string,
    id: string,
    paymentMethods: PaymentMethods,
  ): Promise<ApiResponse<null>> {
    return await this.settingRepository.editPaymentMethods(
      identifier,
      id,
      paymentMethods,
    );
  }

  async removePaymentMethods(
    identifier: string,
    paymentMethodsId: string,
  ): Promise<ApiResponse<null>> {
    return await this.settingRepository.removePaymentMethods(
      identifier,
      paymentMethodsId,
    );
  }
}
