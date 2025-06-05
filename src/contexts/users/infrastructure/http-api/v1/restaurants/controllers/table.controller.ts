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
import { TableUseCase } from 'src/contexts/users/application/restaurants/table.use-case';
import { TableHttpDto } from '../dto/table.http-dto';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/table`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToRestaurant"])
export class TableController {
  constructor(private readonly tableUseCase: TableUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() tableHttpDto: TableHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.tableUseCase.add(req.user.identifier, tableHttpDto);
  }

  @Post('multiple')
  async addMultiple(
    @Req() req,
    @Body() tablesHttpDto: TableHttpDto[],
  ): Promise<ApiResponse<null>> {
    return this.tableUseCase.addMultiple(req.user.identifier, tablesHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() tableHttpDto: TableHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.tableUseCase.edit(req.user.identifier, id, tableHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse<null>> {
    return this.tableUseCase.remove(req.user.identifier, id);
  }
}
