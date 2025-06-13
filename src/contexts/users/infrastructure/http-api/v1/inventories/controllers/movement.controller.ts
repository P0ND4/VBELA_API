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
import { MovementUseCase } from 'src/contexts/users/application/inventories/movement.use-case';
import { MovementHttpDto } from '../dto/movement.http-dto';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/movement`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToInventory"])
export class MovementController {
  constructor(private readonly movementUseCase: MovementUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() movementHttpDto: MovementHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.movementUseCase.add(req.user.selected, movementHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() movementHttpDto: MovementHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.movementUseCase.edit(req.user.selected, id, movementHttpDto);
  }

  @Delete('multiple/:id')
  async removeMultiple(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.movementUseCase.removeMultiple(req.user.selected, id);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.movementUseCase.remove(req.user.selected, id);
  }
}
