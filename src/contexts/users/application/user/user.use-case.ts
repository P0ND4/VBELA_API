import { Injectable } from '@nestjs/common';
import { UserRepositoryEntity } from 'src/contexts/users/domain/repositories/user/user.repository.entity';
import { PrimitiveUser } from '../../domain/user.entity';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { Permissions } from '../../domain/types';

@Injectable()
export class UserUseCase {
  constructor(private readonly userRepository: UserRepositoryEntity) {}

  async getUserInformation(
    identifier: string,
    selected: string,
    permissions: Permissions | null,
  ): Promise<ApiResponse<Partial<PrimitiveUser>>> {
    return await this.userRepository.getUserInformation(identifier, selected, permissions);
  }

  async findAndDeleteUserByIdentifier(
    identifier: string,
  ): Promise<ApiResponse<PrimitiveUser | null>> {
    return await this.userRepository.findAndDeleteUserByIdentifier(identifier);
  }
}
