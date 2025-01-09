import { Injectable, NotFoundException } from '@nestjs/common';
import { PrimitiveUser, UserEntity } from '../../../domain/user.entity';
import { User } from '../../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryEntity } from 'src/contexts/users/domain/repositories/user/user.repository.entity';

@Injectable()
export class UserRepository extends UserRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async findUserByIdentifier(identifier: string): Promise<PrimitiveUser> {
    const user = await this.userModel.findOne({ identifier }).exec();
    if (!user) throw new NotFoundException('User not found');
    return UserEntity.transform(user).toPrimitives();
  }
}
