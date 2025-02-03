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
import { ElementHttpDto } from '../../common-dto/element.http-dto';
import { ProductUseCase } from 'src/contexts/users/application/stores/product.use-case';

@Controller(`${V1_USER}/product`)
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() productHttpDto: ElementHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.productUseCase.add(req.user.identifier, productHttpDto);
  }

  @Put('')
  async edit(
    @Req() req,
    @Body() productHttpDto: ElementHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.productUseCase.edit(req.user.identifier, productHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse<null>> {
    return this.productUseCase.remove(req.user.identifier, id);
  }
}
