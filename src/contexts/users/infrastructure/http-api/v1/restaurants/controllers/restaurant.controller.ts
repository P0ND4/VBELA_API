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
import { V1_USER } from '../../../route.constants';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { RestaurantUseCase } from 'src/contexts/users/application/restaurants/restaurant.use-case';
import { LocationHttpDto } from '../../common-dto/location.http-dto';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/restaurant`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToRestaurant"])
export class RestaurantController {
  constructor(private readonly restaurantUseCase: RestaurantUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() restaurantHttpDto: LocationHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.restaurantUseCase.add(req.user.selected, restaurantHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() restaurantHttpDto: LocationHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.restaurantUseCase.edit(req.user.selected, id, restaurantHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse<null>> {
    return this.restaurantUseCase.remove(req.user.selected, id);
  }
}
