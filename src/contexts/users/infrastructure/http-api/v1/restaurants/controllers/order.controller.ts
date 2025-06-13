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
import { OrderHttpDto } from '../../common-dto/order.http-dto';
import { OrderUseCase } from 'src/contexts/users/application/restaurants/order.use-case';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/order`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToRestaurant"])
export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() orderHttpDto: OrderHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.orderUseCase.add(req.user.selected, orderHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() orderHttpDto: OrderHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.orderUseCase.edit(req.user.selected, id, orderHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse<null>> {
    return this.orderUseCase.remove(req.user.selected, id);
  }
}
