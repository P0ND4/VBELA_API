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
import { HandlerHttpDto } from '../dto/handler.http-dto';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { HandlerUseCase } from 'src/contexts/users/application/handlers/handler.use-case';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/handler`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["admin"])
export class HandlerController {
  constructor(private readonly handlerUseCase: HandlerUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() handlerHttpDto: HandlerHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.handlerUseCase.add(req.user.selected, handlerHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() handlerHttpDto: HandlerHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.handlerUseCase.edit(req.user.selected, id, handlerHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.handlerUseCase.remove(req.user.selected, id);
  }
}
