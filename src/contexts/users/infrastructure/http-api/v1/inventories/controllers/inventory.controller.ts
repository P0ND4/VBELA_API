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
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { V1_USER } from '../../../route.constants';
import { InventoryHttpDto } from '../dto/inventory.http-dto';
import { ApiResponse } from 'src/contexts/users/domain/api.response';
import { InventoryUseCase } from 'src/contexts/users/application/inventories/inventory.use-case';

@Controller(`${V1_USER}/inventory`)
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryUseCase: InventoryUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() inventoryHttpDto: InventoryHttpDto,
  ): Promise<ApiResponse> {
    return this.inventoryUseCase.add(req.user.identifier, inventoryHttpDto);
  }

  @Put('')
  async edit(
    @Req() req,
    @Body() inventoryHttpDto: InventoryHttpDto,
  ): Promise<ApiResponse> {
    return this.inventoryUseCase.edit(req.user.identifier, inventoryHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse> {
    return this.inventoryUseCase.remove(req.user.identifier, id);
  }
}
