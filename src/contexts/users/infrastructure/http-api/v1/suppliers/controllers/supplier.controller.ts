import {
  Controller,
  Delete,
  Post,
  Put,
  Body,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { V1_USER } from '../../../route.constants';
import { SupplierHttpDto } from '../dto/supplier.http-dto';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { SupplierUseCase } from 'src/contexts/users/application/suppliers/supplier.use-case';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/supplier`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(['accessToSupplier'])
export class SupplierController {
  constructor(private readonly supplierUseCase: SupplierUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() supplierHttpDto: SupplierHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.supplierUseCase.add(req.user.selected, supplierHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() supplierHttpDto: SupplierHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.supplierUseCase.edit(req.user.selected, id, supplierHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.supplierUseCase.remove(req.user.selected, id);
  }
}
