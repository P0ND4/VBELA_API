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
import { HandlerHttpDto } from '../dto/handler.http-dto';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { HandlerUseCase } from 'src/contexts/users/application/handlers/handler.use-case';

@Controller(`${V1_USER}/handler`)
@UseGuards(JwtAuthGuard)
export class HandlerController {
  constructor(private readonly handlerUseCase: HandlerUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() handlerHttpDto: HandlerHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.handlerUseCase.add(req.user.identifier, handlerHttpDto);
  }

  @Put('')
  async edit(
    @Req() req,
    @Body() handlerHttpDto: HandlerHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.handlerUseCase.edit(req.user.identifier, handlerHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.handlerUseCase.remove(req.user.identifier, id);
  }
}
