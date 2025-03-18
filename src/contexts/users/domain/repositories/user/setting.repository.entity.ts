import { ApiResponse } from "../../../../shared/api.response";
import { EconomicGroup, InvoiceInformation, PaymentMethods } from "../../types";

export abstract class SettingRepositoryEntity {
  abstract darkMode(identifier: string, darkMode: boolean): Promise<ApiResponse<null>>;
  abstract invoiceInformation(identifier: string, invoiceInformation: InvoiceInformation): Promise<ApiResponse<null>>;
  abstract color(identifier: string, color: number): Promise<ApiResponse<null>>;
  abstract addPaymentMethods(identifier: string, paymentMethods: PaymentMethods): Promise<ApiResponse<null>>;
  abstract editPaymentMethods(identifier: string, id: string, paymentMethods: PaymentMethods): Promise<ApiResponse<null>>;
  abstract removePaymentMethods(identifier: string, paymentMethodsId: string): Promise<ApiResponse<null>>;
  abstract addEconomicGroup(identifier: string, economicGroup: EconomicGroup): Promise<ApiResponse<null>>;
  abstract editEconomicGroup(identifier: string, id: string, economicGroup: EconomicGroup): Promise<ApiResponse<null>>;
  abstract removeEconomicGroup(identifier: string, economicGroupId: string): Promise<ApiResponse<null>>;
}
