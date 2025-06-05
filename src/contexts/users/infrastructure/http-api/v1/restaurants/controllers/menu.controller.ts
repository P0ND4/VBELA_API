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
import { ApiResponse } from 'src/contexts/shared/api.response';
import { ElementHttpDto } from '../../common-dto/element.http-dto';
import { MenuUseCase } from 'src/contexts/users/application/restaurants/menu.use-case';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/menu`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToRestaurant"])
export class MenuController {
  constructor(private readonly menuUseCase: MenuUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() menuHttpDto: ElementHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.menuUseCase.add(req.user.identifier, menuHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() menuHttpDto: ElementHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.menuUseCase.edit(req.user.identifier, id, menuHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse<null>> {
    return this.menuUseCase.remove(req.user.identifier, id);
  }
}
