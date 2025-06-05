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
import { EconomyHttpDto } from '../dto/economy.http-dto';
import { EconomyUseCase } from 'src/contexts/users/application/economies/economy.use-case';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/economy`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(['accessToEconomy'])
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
