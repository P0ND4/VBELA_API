import { Injectable } from '@nestjs/common';
import { UserRepositoryEntity } from 'src/contexts/users/domain/repositories/user/user.repository.entity';
import { PrimitiveUser } from '../../domain/user.entity';
import { ApiResponse } from 'src/contexts/shared/api.response';

@Injectable()
export class UserUseCase {
  constructor(private readonly userRepository: UserRepositoryEntity) {}

  async findUserByIdentifier(
    identifier: string,
  ): Promise<ApiResponse<PrimitiveUser | null>> {
    return await this.userRepository.findUserByIdentifier(identifier);
  }

  async getUserInformation(
    identifier: string,
    collaborator: string | null
  ): Promise<ApiResponse<Partial<PrimitiveUser> | null>> {
    return await this.userRepository.getUserInformation(identifier, collaborator);
  }

  async findAndDeleteUserByIdentifier(
    identifier: string,
  ): Promise<ApiResponse<PrimitiveUser | null>> {
    return await this.userRepository.findAndDeleteUserByIdentifier(identifier);
  }
}

//TODO CONTINUAR CON EL FRONTEND Y LUEGO TERMINAR ESTO
