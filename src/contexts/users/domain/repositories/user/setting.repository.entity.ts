import { ApiResponse } from "../../api.response";
import { InvoiceInformation, PaymentMethods } from "../../types";

export abstract class SettingRepositoryEntity {
  abstract darkMode(identifier: string, darkMode: boolean): Promise<ApiResponse>;
  abstract invoiceInformation(identifier: string, invoiceInformation: InvoiceInformation): Promise<ApiResponse>;
  abstract coin(identifier: string, coin: string): Promise<ApiResponse>;
  abstract color(identifier: string, color: number): Promise<ApiResponse>;
  abstract addPaymentMethods(identifier: string, paymentMethods: PaymentMethods): Promise<ApiResponse>;
  abstract editPaymentMethods(identifier: string, paymentMethods: PaymentMethods): Promise<ApiResponse>;
  abstract removePaymentMethods(identifier: string, paymentMethodsId: string): Promise<ApiResponse>;
}
