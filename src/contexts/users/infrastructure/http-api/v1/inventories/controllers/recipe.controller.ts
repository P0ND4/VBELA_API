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
import { RecipeHttpDto } from '../dto/recipe.http-dto';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { RecipeUseCase } from 'src/contexts/users/application/inventories/recipe.use-case';

@Controller(`${V1_USER}/recipe`)
@UseGuards(JwtAuthGuard)
export class RecipeController {
  constructor(private readonly recipeUseCase: RecipeUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() recipeHttpDto: RecipeHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.recipeUseCase.add(req.user.identifier, recipeHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() recipeHttpDto: RecipeHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.recipeUseCase.edit(req.user.identifier, id, recipeHttpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<ApiResponse<null>> {
    return this.recipeUseCase.remove(req.user.identifier, id);
  }
}
