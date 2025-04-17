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
import { MovementUseCase } from 'src/contexts/users/application/inventories/movement.use-case';
import { MovementHttpDto } from '../dto/movement.http-dto';

@Controller(`${V1_USER}/movement`)
@UseGuards(JwtAuthGuard)
export class MovementController {
  constructor(private readonly movementUseCase: MovementUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() movementHttpDto: MovementHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.movementUseCase.add(req.user.identifier, movementHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() movementHttpDto: MovementHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.movementUseCase.edit(req.user.identifier, id, movementHttpDto);
  }

  @Delete('multiple/:id')
  async removeMultiple(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.movementUseCase.removeMultiple(req.user.identifier, id);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.movementUseCase.remove(req.user.identifier, id);
  }
}
