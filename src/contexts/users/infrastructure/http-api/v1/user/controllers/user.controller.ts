import {
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { V1_USER } from '../../../route.constants';
import { UserUseCase } from 'src/contexts/users/application/user/user.use-case';
import { PrimitiveUser } from 'src/contexts/users/domain/user.entity';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { AccessTokenGuard } from '../../../../../../shared/guards/access-token.guard';
import { OwnerGuard } from '../guard/owner.guard';

@Controller(V1_USER)
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @UseGuards(AccessTokenGuard)
  @Get('')
  getUserInformation(@Req() req): Promise<ApiResponse<Partial<PrimitiveUser>>> {
    const { identifier, selected, permissions } = req.user;
    return this.userUseCase.getUserInformation(identifier, selected, permissions);
  }

  @UseGuards(OwnerGuard)
  @Delete('')
  findAndDeleteUserByIdentifier(
    @Request() req,
  ): Promise<ApiResponse<PrimitiveUser | null>> {
    return this.userUseCase.findAndDeleteUserByIdentifier(req.user.identifier);
  }
}
