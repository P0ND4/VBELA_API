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
import { ApiResponse } from 'src/contexts/shared/api.response';
import { GroupHttpDTO } from '../../common-dto/group.http-dto';
import { MenuGroupUseCase } from 'src/contexts/users/application/restaurants/menu.group.use-case';

@Controller(`${V1_USER}/menu-group`)
@UseGuards(JwtAuthGuard)
export class MenuGroupController {
  constructor(private readonly menuGroupUseCase: MenuGroupUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() groupHttpDto: GroupHttpDTO,
  ): Promise<ApiResponse<null>> {
    return this.menuGroupUseCase.add(req.user.identifier, groupHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() groupHttpDto: GroupHttpDTO,
  ): Promise<ApiResponse<null>> {
    return this.menuGroupUseCase.edit(req.user.identifier, id, groupHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.menuGroupUseCase.remove(req.user.identifier, id);
  }
}
