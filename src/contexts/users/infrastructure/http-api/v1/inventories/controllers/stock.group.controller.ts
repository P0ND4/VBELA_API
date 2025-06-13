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
import { StockGroupUseCase } from 'src/contexts/users/application/inventories/stock.group.use-case';
import { GroupHttpDTO } from '../../common-dto/group.http-dto';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/stock-group`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToInventory"])
export class StockGroupController {
  constructor(private readonly stockGroupUseCase: StockGroupUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() groupHttpDto: GroupHttpDTO,
  ): Promise<ApiResponse<null>> {
    return this.stockGroupUseCase.add(req.user.selected, groupHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() groupHttpDto: GroupHttpDTO,
  ): Promise<ApiResponse<null>> {
    return this.stockGroupUseCase.edit(req.user.selected, id, groupHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.stockGroupUseCase.remove(req.user.selected, id);
  }
}
