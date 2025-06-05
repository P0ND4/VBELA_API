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
import { Kitchen, KitchenHttpDto } from '../dto/kitchen.http-dto';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { KitchenUseCase } from 'src/contexts/users/application/kitchens/kitchen.use-case';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/kitchen`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToKitchen"])
export class KitchenController {
  constructor(private readonly kitchenUseCase: KitchenUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() kitchenHttpDto: KitchenHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.kitchenUseCase.add(req.user.identifier, kitchenHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() kitchenHttpDto: Kitchen,
  ): Promise<ApiResponse<null>> {
    return this.kitchenUseCase.edit(req.user.identifier, id, kitchenHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.kitchenUseCase.remove(req.user.identifier, id);
  }
}
