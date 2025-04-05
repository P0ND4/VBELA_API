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
import { PortionUseCase } from 'src/contexts/users/application/inventories/portion.use-case';
import {
  PortionActivityHttpDto,
  PortionHttpDto,
} from '../dto/portion.http-dto';

@Controller(`${V1_USER}/portion`)
@UseGuards(JwtAuthGuard)
export class PortionController {
  constructor(private readonly portionUseCase: PortionUseCase) {}

  
  @Post('')
  async add(
    @Req() req,
    @Body() portionHttpDto: PortionHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.portionUseCase.add(req.user.identifier, portionHttpDto);
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
    return this.portionUseCase.edit(req.user.identifier, id, portionHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.portionUseCase.remove(req.user.identifier, id);
  }
}
