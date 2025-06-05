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
import { ElementHttpDto } from '../../common-dto/element.http-dto';
import { ProductUseCase } from 'src/contexts/users/application/stores/product.use-case';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/product`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToStore"])
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() productHttpDto: ElementHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.productUseCase.add(req.user.identifier, productHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() productHttpDto: ElementHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.productUseCase.edit(req.user.identifier, id, productHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse<null>> {
    return this.productUseCase.remove(req.user.identifier, id);
  }
}
