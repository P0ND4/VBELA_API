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
import { KitchenHttpDto } from '../dto/kitchen.http-dto';
import { ApiResponse } from 'src/contexts/users/domain/api.response';
import { KitchenUseCase } from 'src/contexts/users/application/kitchens/kitchen.use-case';

@Controller(`${V1_USER}/kitchen`)
@UseGuards(JwtAuthGuard)
export class KitchenController {
  constructor(private readonly kitchenUseCase: KitchenUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() kitchenHttpDto: KitchenHttpDto,
  ): Promise<ApiResponse> {
    return this.kitchenUseCase.add(req.user.identifier, kitchenHttpDto);
  }

  @Put('')
  async edit(
    @Req() req,
    @Body() kitchenHttpDto: KitchenHttpDto,
  ): Promise<ApiResponse> {
    return this.kitchenUseCase.edit(req.user.identifier, kitchenHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse> {
    return this.kitchenUseCase.remove(req.user.identifier, id);
  }
}
