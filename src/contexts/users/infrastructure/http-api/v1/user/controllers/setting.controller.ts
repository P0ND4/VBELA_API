import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { V1_USER } from '../../../route.constants';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { SettingUseCase } from 'src/contexts/users/application/user/setting.use-case';
import {
  ColorHttpDto,
  DarkModeHttpDto,
  InitialBasisHttpDto,
  InvoiceInformationHttpDto,
  PaymentMethodsHttpDto,
  TaxHttpDto,
  TipHttpDto,
} from '../dto/setting.http-dto';
import { ApiResponse } from 'src/contexts/shared/api.response';

@Controller(`${V1_USER}/setting`)
@UseGuards(JwtAuthGuard)
export class SettingController {
  constructor(private readonly settingUseCase: SettingUseCase) {}

  @Patch('dark-mode')
  async darkMode(
    @Request() req,
    @Body() darkModeHttpDto: DarkModeHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.darkMode(
      req.user.identifier,
      darkModeHttpDto.darkMode,
    );
  }

  @Patch('color')
  async color(
    @Request() req,
    @Body() colorHttpDto: ColorHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.color(req.user.identifier, colorHttpDto.color);
  }

  @Patch('tip')
  async tip(
    @Request() req,
    @Body() tipHttpDto: TipHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.tip(req.user.identifier, tipHttpDto.tip);
  }

  @Patch('tax')
  async tax(
    @Request() req,
    @Body() taxHttpDto: TaxHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.tax(req.user.identifier, taxHttpDto.tax);
  }

  @Patch('initial-basis')
  async initialBasis(
    @Request() req,
    @Body() initialBasisHttpDto: InitialBasisHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.initialBasis(
      req.user.identifier,
      initialBasisHttpDto.initialBasis,
    );
  }

  @Patch('invoice-information')
  async invoiceInformation(
    @Request() req,
    @Body() invoiceInformationHttpDto: InvoiceInformationHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.invoiceInformation(
      req.user.identifier,
      invoiceInformationHttpDto,
    );
  }

  @Post('payment-methods')
  async addPaymentMethods(
    @Request() req,
    @Body() paymentMethodsHttpDto: PaymentMethodsHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.addPaymentMethods(
      req.user.identifier,
      paymentMethodsHttpDto,
    );
  }

  @Put('payment-methods/:id')
  async editPaymentMethods(
    @Request() req,
    @Param('id') id: string,
    @Body() paymentMethodsHttpDto: PaymentMethodsHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.editPaymentMethods(
      req.user.identifier,
      id,
      paymentMethodsHttpDto,
    );
  }

  @Delete('payment-methods/:id')
  async removePaymentMethods(
    @Param('id') id: string,
    @Request() req,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.removePaymentMethods(req.user.identifier, id);
  }
}
