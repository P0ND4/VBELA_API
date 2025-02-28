import { Controller, Delete, Get, Request, UseGuards } from '@nestjs/common';
import { V1_USER } from '../../../route.constants';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserUseCase } from 'src/contexts/users/application/user/user.use-case';
import { PrimitiveUser } from 'src/contexts/users/domain/user.entity';
import { ApiResponse } from 'src/contexts/shared/api.response';

@Controller(V1_USER)
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get('')
  findUserByIdentifier(@Request() req): Promise<ApiResponse<PrimitiveUser | null>> {
    return this.userUseCase.findUserByIdentifier(req.user.identifier);
  }

  @Get('information')
  getUserInformation(@Request() req): Promise<ApiResponse<Partial<PrimitiveUser> | null>> {
    return this.userUseCase.getUserInformation(req.user.identifier, req.user.collaborator);
  }

  @Delete('')
  findAndDeleteUserByIdentifier(@Request() req): Promise<ApiResponse<PrimitiveUser | null>> {
    return this.userUseCase.findAndDeleteUserByIdentifier(req.user.identifier);
  }
}

//TODO CONTINUAR CON EL FRONTEND Y LUEGO TERMINAR ESTO
