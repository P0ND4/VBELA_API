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
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/setting`)
@UseGuards(PermissionAccessTokenGuard)
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

  @RequiredPermissions(["admin"])
  @Patch('tip')
  async tip(
    @Request() req,
    @Body() tipHttpDto: TipHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.tip(req.user.selected, tipHttpDto.tip);
  }

  @RequiredPermissions(["admin"])
  @Patch('tax')
  async tax(
    @Request() req,
    @Body() taxHttpDto: TaxHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.tax(req.user.selected, taxHttpDto.tax);
  }

  @RequiredPermissions(["admin"])
  @Patch('initial-basis')
  async initialBasis(
    @Request() req,
    @Body() initialBasisHttpDto: InitialBasisHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.initialBasis(
      req.user.selected,
      initialBasisHttpDto.initialBasis,
    );
  }

  @RequiredPermissions(["admin"])
  @Patch('invoice-information')
  async invoiceInformation(
    @Request() req,
    @Body() invoiceInformationHttpDto: InvoiceInformationHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.invoiceInformation(
      req.user.selected,
      invoiceInformationHttpDto,
    );
  }

  @RequiredPermissions(["admin"])
  @Post('payment-methods')
  async addPaymentMethods(
    @Request() req,
    @Body() paymentMethodsHttpDto: PaymentMethodsHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.addPaymentMethods(
      req.user.selected,
      paymentMethodsHttpDto,
    );
  }

  @RequiredPermissions(["admin"])
  @Put('payment-methods/:id')
  async editPaymentMethods(
    @Request() req,
    @Param('id') id: string,
    @Body() paymentMethodsHttpDto: PaymentMethodsHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.editPaymentMethods(
      req.user.selected,
      id,
      paymentMethodsHttpDto,
    );
  }

  @RequiredPermissions(["admin"])
  @Delete('payment-methods/:id')
  async removePaymentMethods(
    @Param('id') id: string,
    @Request() req,
  ): Promise<ApiResponse<null>> {
    return this.settingUseCase.removePaymentMethods(req.user.selected, id);
  }
}
