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
import { AccessTokenGuard } from '../../../../../../shared/guards/access-token.guard';
import { V1_USER } from '../../../route.constants';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { LocationHttpDto } from '../../common-dto/location.http-dto';
import { StoreUseCase } from 'src/contexts/users/application/stores/store.use-case';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/store`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToStore"])
export class StoreController {
  constructor(private readonly storeUseCase: StoreUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() storeHttpDto: LocationHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.storeUseCase.add(req.user.selected, storeHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() storeHttpDto: LocationHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.storeUseCase.edit(req.user.selected, id, storeHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse<null>> {
    return this.storeUseCase.remove(req.user.selected, id);
  }
}
