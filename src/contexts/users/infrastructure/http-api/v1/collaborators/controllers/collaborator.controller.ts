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
import { CollaboratorHttpDto } from '../dto/collaborator.http-dto';
import { CollaboratorUseCase } from 'src/contexts/users/application/collaborators/collaborator.use-case';
import { PermissionAccessTokenGuard } from '../../auth/guards/permission-access-token.guard';
import { RequiredPermissions } from '../../auth/decorators/required-permissions.decorator';


@Controller(`${V1_USER}/collaborator`)
@UseGuards(PermissionAccessTokenGuard)
@RequiredPermissions(["accessToCollaborator"])
export class CollaboratorController {
  constructor(private readonly collaboratorUseCase: CollaboratorUseCase) {}

  @Post('')
  async add(
    @Req() req,
    @Body() collaboratorHttpDto: CollaboratorHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.collaboratorUseCase.add(req.user.selected, collaboratorHttpDto);
  }

  @Put(':id')
  async edit(
    @Req() req,
    @Param('id') id: string,
    @Body() collaboratorHttpDto: CollaboratorHttpDto,
  ): Promise<ApiResponse<null>> {
    return this.collaboratorUseCase.edit(req.user.selected, id, collaboratorHttpDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApiResponse<null>> {
    return this.collaboratorUseCase.remove(req.user.selected, id);
  }
}
