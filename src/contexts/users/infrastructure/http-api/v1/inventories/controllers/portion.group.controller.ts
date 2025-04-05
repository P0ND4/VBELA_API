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
import { PortionGroupUseCase } from 'src/contexts/users/application/inventories/portion.group.use-case';

@Controller(`${V1_USER}/portion-group`)
@UseGuards(JwtAuthGuard)
export class PortionGroupController {
  constructor(private readonly portionGroupUseCase: PortionGroupUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() groupHttpDto: GroupHttpDTO,
  ): Promise<ApiResponse<null>> {
    return this.portionGroupUseCase.add(req.user.identifier, groupHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() groupHttpDto: GroupHttpDTO,
  ): Promise<ApiResponse<null>> {
    return this.portionGroupUseCase.edit(req.user.identifier, id, groupHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.portionGroupUseCase.remove(req.user.identifier, id);
  }
}
