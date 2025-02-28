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
import { OrderHttpDto } from '../../common-dto/order.http-dto';
import { SaleUseCase } from 'src/contexts/users/application/stores/sale.use-case';

@Controller(`${V1_USER}/sale`)
@UseGuards(JwtAuthGuard)
export class SaleController {
  constructor(private readonly saleUseCase: SaleUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() saleHttpDto: OrderHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.saleUseCase.add(req.user.identifier, saleHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() saleHttpDto: OrderHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.saleUseCase.edit(req.user.identifier, id, saleHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.saleUseCase.remove(req.user.identifier, id);
  }
}
