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
import { StockUseCase } from 'src/contexts/users/application/inventories/stock.use-case';
import { StockHttpDto } from '../dto/stock.http-dto';

@Controller(`${V1_USER}/stock`)
@UseGuards(JwtAuthGuard)
export class StockController {
  constructor(private readonly stockUseCase: StockUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() stockHttpDto: StockHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.stockUseCase.add(req.user.identifier, stockHttpDto);
  }

  @Put('')
  async edit(
    @Req() req,
    @Body() stockHttpDto: StockHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.stockUseCase.edit(req.user.identifier, stockHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse<null>> {
    return this.stockUseCase.remove(req.user.identifier, id);
  }
}
