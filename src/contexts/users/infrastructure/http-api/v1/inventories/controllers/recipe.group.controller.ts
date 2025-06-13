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
import { GroupHttpDTO } from '../../common-dto/group.http-dto';
import { RecipeGroupUseCase } from 'src/contexts/users/application/inventories/recipe.group.use-case';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';

@Controller(`${V1_USER}/recipe-group`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToInventory"])
export class RecipeGroupController {
  constructor(private readonly recipeGroupUseCase: RecipeGroupUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() groupHttpDto: GroupHttpDTO,
  ): Promise<ApiResponse<null>> {
    return this.recipeGroupUseCase.add(req.user.selected, groupHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() groupHttpDto: GroupHttpDTO,
  ): Promise<ApiResponse<null>> {
    return this.recipeGroupUseCase.edit(req.user.selected, id, groupHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.recipeGroupUseCase.remove(req.user.selected, id);
  }
}
