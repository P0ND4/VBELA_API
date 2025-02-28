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
import { ProductGroupUseCase } from 'src/contexts/users/application/stores/product.group.use-case';
import { GroupHttpDTO } from '../../common-dto/group.http-dto';

@Controller(`${V1_USER}/product-group`)
@UseGuards(JwtAuthGuard)
export class ProductGroupController {
  constructor(private readonly productGroupUseCase: ProductGroupUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() groupHttpDto: GroupHttpDTO,
  ): Promise<ApiResponse<null>> {
    return this.productGroupUseCase.add(req.user.identifier, groupHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() groupHttpDto: GroupHttpDTO,
  ): Promise<ApiResponse<null>> {
    return this.productGroupUseCase.edit(req.user.identifier, id, groupHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.productGroupUseCase.remove(req.user.identifier, id);
  }
}
