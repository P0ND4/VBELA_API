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
import { ApiResponse } from 'src/contexts/shared/api.response';
import { StockUseCase } from 'src/contexts/users/application/inventories/stock.use-case';
import { StockHttpDto } from '../dto/stock.http-dto';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/stock`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToInventory"])
export class StockController {
  constructor(private readonly stockUseCase: StockUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() stockHttpDto: StockHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.stockUseCase.add(req.user.identifier, stockHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() stockHttpDto: StockHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.stockUseCase.edit(req.user.identifier, id, stockHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.stockUseCase.remove(req.user.identifier, id);
  }
}
