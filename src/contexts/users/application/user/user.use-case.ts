import { Injectable } from '@nestjs/common';
import { UserRepositoryEntity } from 'src/contexts/users/domain/repositories/user/user.repository.entity';
import { PrimitiveUser } from '../../domain/user.entity';

@Injectable()
export class UserUseCase {
  constructor(private readonly userRepository: UserRepositoryEntity) {}

  async findUserByIdentifier(identifier: string): Promise<PrimitiveUser> {
    return await this.userRepository.findUserByIdentifier(identifier);
  }
}
