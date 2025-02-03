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
import { ApiResponse } from 'src/contexts/shared/api.response';
import { TableUseCase } from 'src/contexts/users/application/restaurants/table.use-case';
import { TableHttpDto } from '../dto/table.http-dto';

@Controller(`${V1_USER}/table`)
@UseGuards(JwtAuthGuard)
export class TableController {
  constructor(private readonly tableUseCase: TableUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() tableHttpDto: TableHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.tableUseCase.add(req.user.identifier, tableHttpDto);
  }

  @Put('')
  async edit(
    @Req() req,
    @Body() tableHttpDto: TableHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.tableUseCase.edit(req.user.identifier, tableHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse<null>> {
    return this.tableUseCase.remove(req.user.identifier, id);
  }
}
