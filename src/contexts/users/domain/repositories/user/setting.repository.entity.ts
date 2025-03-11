import { ApiResponse } from "../../../../shared/api.response";
import { InvoiceInformation, PaymentMethods } from "../../types";

export abstract class SettingRepositoryEntity {
  abstract darkMode(identifier: string, darkMode: boolean): Promise<ApiResponse<null>>;
  abstract invoiceInformation(identifier: string, invoiceInformation: InvoiceInformation): Promise<ApiResponse<null>>;
  abstract color(identifier: string, color: number): Promise<ApiResponse<null>>;
  abstract addPaymentMethods(identifier: string, paymentMethods: PaymentMethods): Promise<ApiResponse<null>>;
  abstract editPaymentMethods(identifier: string, id: string, paymentMethods: PaymentMethods): Promise<ApiResponse<null>>;
  abstract removePaymentMethods(identifier: string, paymentMethodsId: string): Promise<ApiResponse<null>>;
}
