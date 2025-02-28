import { HttpStatus, Injectable } from '@nestjs/common';
import { PrimitiveUser, UserEntity } from '../../../domain/user.entity';
import { User } from '../../schema/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryEntity } from 'src/contexts/users/domain/repositories/user/user.repository.entity';
import { ApiResponse, Status } from 'src/contexts/shared/api.response';

@Injectable()
export class UserRepository extends UserRepositoryEntity {
  constructor(@InjectModel(User.name) public userModel: Model<User>) {
    super();
  }

  async findUserByIdentifier(
    identifier: string,
  ): Promise<ApiResponse<any | null>> {
    const user = await this.userModel.find().exec();
    const sessions = user.filter((user) => user.identifier === identifier);

    return new ApiResponse(
      !!sessions.length ? Status.Success : Status.Error,
      !!sessions.length ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      !!sessions.length ? 'Usuario encontrado' : 'Usuario no encontrado',
      !!sessions.length ? sessions : null,
    );
  }
  async getUserInformation(
    identifier: string,
    collaborator: string | null,
  ): Promise<ApiResponse<Partial<PrimitiveUser> | null>> {
    const user = await this.userModel.findOne({ identifier }).exec();

    return new ApiResponse(
      user ? Status.Success : Status.Error,
      user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      user ? 'Usuario encontrado' : 'Usuario no encontrado',
      user ? UserEntity.transform(user).toPrimitives() : null,
    );
  }
  async findAndDeleteUserByIdentifier(
    identifier: string,
  ): Promise<ApiResponse<PrimitiveUser | null>> {
    const user = await this.userModel.findOneAndDelete({ identifier }).exec();

    return new ApiResponse(
      user ? Status.Success : Status.Error,
      user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      user ? 'Usuario eliminado' : 'Usuario no encontrado',
      user ? UserEntity.transform(user).toPrimitives() : null,
    );
  }
}

//TODO CONTINUAR CON EL FRONTEND Y LUEGO TERMINAR ESTO
