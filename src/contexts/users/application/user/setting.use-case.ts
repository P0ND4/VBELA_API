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

  async addEconomicGroup(
    identifier: string,
    economicGroup: EconomicGroup,
  ): Promise<ApiResponse<null>> {
    return await this.settingRepository.addEconomicGroup(
      identifier,
      economicGroup,
    );
  }

  async editEconomicGroup(
    identifier: string,
    id: string,
    economicGroup: EconomicGroup,
  ): Promise<ApiResponse<null>> {
    return await this.settingRepository.editEconomicGroup(
      identifier,
      id,
      economicGroup,
    );
  }

  async removeEconomicGroup(
    identifier: string,
    economicGroupId: string,
  ): Promise<ApiResponse<null>> {
    return await this.settingRepository.removeEconomicGroup(
      identifier,
      economicGroupId,
    );
  }
}
