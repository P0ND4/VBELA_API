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
}
