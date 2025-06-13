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
import { PortionUseCase } from 'src/contexts/users/application/inventories/portion.use-case';
import {
  PortionActivityHttpDto,
  PortionHttpDto,
} from '../dto/portion.http-dto';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/portion`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToInventory"])
export class PortionController {
  constructor(private readonly portionUseCase: PortionUseCase) {}

  
  @Post('')
  async add(
    @Req() req,
    @Body() portionHttpDto: PortionHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.portionUseCase.add(req.user.selected, portionHttpDto);
  }
  @Post('activity')
  async addActivity(
    @Req() Req,
    @Body() activityHttpDto: PortionActivityHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.portionUseCase.addActivity(Req.user.identifier, activityHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() portionHttpDto: PortionHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.portionUseCase.edit(req.user.selected, id, portionHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.portionUseCase.remove(req.user.selected, id);
  }
}
