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
import { ElementHttpDto } from '../../common-dto/element.http-dto';
import { MenuUseCase } from 'src/contexts/users/application/restaurants/menu.use-case';

@Controller(`${V1_USER}/menu`)
@UseGuards(JwtAuthGuard)
export class MenuController {
  constructor(private readonly menuUseCase: MenuUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() menuHttpDto: ElementHttpDto,
  ): Promise<ApiResponse> {
    return this.menuUseCase.add(req.user.identifier, menuHttpDto);
  }

  @Put('')
  async edit(
    @Req() req,
    @Body() menuHttpDto: ElementHttpDto,
  ): Promise<ApiResponse> {
    return this.menuUseCase.edit(req.user.identifier, menuHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse> {
    return this.menuUseCase.remove(req.user.identifier, id);
  }
}
