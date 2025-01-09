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
import { ApiResponse } from 'src/contexts/users/domain/api.response';
import { RestaurantUseCase } from 'src/contexts/users/application/restaurants/restaurant.use-case';
import { LocationHttpDto } from '../../common-dto/location.http-dto';

@Controller(`${V1_USER}/restaurant`)
@UseGuards(JwtAuthGuard)
export class RestaurantController {
  constructor(private readonly restaurantUseCase: RestaurantUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() restaurantHttpDto: LocationHttpDto,
  ): Promise<ApiResponse> {
    return this.restaurantUseCase.add(req.user.identifier, restaurantHttpDto);
  }

  @Put('')
  async edit(
    @Req() req,
    @Body() restaurantHttpDto: LocationHttpDto,
  ): Promise<ApiResponse> {
    return this.restaurantUseCase.edit(req.user.identifier, restaurantHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse> {
    return this.restaurantUseCase.remove(req.user.identifier, id);
  }
}
