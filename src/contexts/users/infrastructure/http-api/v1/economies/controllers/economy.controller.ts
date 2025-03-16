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
import { EconomyHttpDto } from '../dto/economy.http-dto';
import { EconomyUseCase } from 'src/contexts/users/application/economies/economy.use-case';

@Controller(`${V1_USER}/economy`)
@UseGuards(JwtAuthGuard)
export class EconomyController {
  constructor(private readonly economyUseCase: EconomyUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() economyHttpDto: EconomyHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.economyUseCase.add(req.user.identifier, economyHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() economyHttpDto: EconomyHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.economyUseCase.edit(req.user.identifier, id, economyHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.economyUseCase.remove(req.user.identifier, id);
  }
}
