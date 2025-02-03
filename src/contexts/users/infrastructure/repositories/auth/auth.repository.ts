import { Injectable } from '@nestjs/common';
import {
  AuthRepositoryEntity,
  ValidateDto,
} from '../../../domain/repositories/auth/auth.repository.entity';
import { PrimitiveUser, UserEntity } from '../../../domain/user.entity';
import { User } from '../../schema/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository extends AuthRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async validate({ identifier, expoID }: ValidateDto): Promise<PrimitiveUser> {
    const existingUser = await this.userModel.findOne({ identifier }).exec();

    if (existingUser) return UserEntity.transform(existingUser).toPrimitives();

    const newUser = new this.userModel({ identifier, expoID });
    const savedUser = await newUser.save();

    return UserEntity.transform(savedUser).toPrimitives();
  }
}
