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
import { LocationHttpDto } from '../../common-dto/location.http-dto';
import { StoreUseCase } from 'src/contexts/users/application/stores/store.use-case';

@Controller(`${V1_USER}/store`)
@UseGuards(JwtAuthGuard)
export class StoreController {
  constructor(private readonly storeUseCase: StoreUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() storeHttpDto: LocationHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.storeUseCase.add(req.user.identifier, storeHttpDto);
  }

  @Put('')
  async edit(
    @Req() req,
    @Body() storeHttpDto: LocationHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.storeUseCase.edit(req.user.identifier, storeHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse<null>> {
    return this.storeUseCase.remove(req.user.identifier, id);
  }
}
