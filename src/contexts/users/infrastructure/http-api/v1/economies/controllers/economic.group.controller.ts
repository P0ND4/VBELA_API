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
import { EconomicGroupUseCase } from 'src/contexts/users/application/economies/economic.group.use-case';
import { EconomicGroupHttpDto } from '../dto/economic.group.http-dto';

@Controller(`${V1_USER}/economic-group`)
@UseGuards(JwtAuthGuard)
export class EconomicGroupController {
  constructor(private readonly economicGroupUseCase: EconomicGroupUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() economicGroup: EconomicGroupHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.economicGroupUseCase.add(req.user.identifier, economicGroup);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() economicGroup: EconomicGroupHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.economicGroupUseCase.edit(
      req.user.identifier,
      id,
      economicGroup,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.economicGroupUseCase.remove(req.user.identifier, id);
  }
}
