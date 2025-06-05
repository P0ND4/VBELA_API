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
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';
import { V1_USER } from '../../../route.constants';
import { InventoryHttpDto } from '../dto/inventory.http-dto';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { InventoryUseCase } from 'src/contexts/users/application/inventories/inventory.use-case';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/inventory`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToInventory"])
export class InventoryController {
  constructor(private readonly inventoryUseCase: InventoryUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() inventoryHttpDto: InventoryHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.inventoryUseCase.add(req.user.identifier, inventoryHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() inventoryHttpDto: InventoryHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.inventoryUseCase.edit(req.user.identifier, id, inventoryHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse<null>> {
    return this.inventoryUseCase.remove(req.user.identifier, id);
  }
}
