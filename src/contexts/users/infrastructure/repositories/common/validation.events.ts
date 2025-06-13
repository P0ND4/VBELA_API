import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schema/user/user.schema';
import { PrimitiveUser, UserEntity } from '../../../domain/user.entity';

@Injectable()
export class ValidationEvents {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async validate(identifier: string, selected: string): Promise<PrimitiveUser> {
    // Caso: Usuario seleccionado es diferente al identificador (colaborador)
    if (identifier !== selected) {
      const user = await this.userModel.findOne({ identifier: selected }).exec();
      if (!user) throw new UnauthorizedException('El usuario no existe.');
      return UserEntity.transform(user).toPrimitives();
    }

    // Caso: Usuario es el mismo (buscar o crear)
    const existingUser = await this.userModel.findOne({ identifier }).exec();
    if (existingUser) return UserEntity.transform(existingUser).toPrimitives();

    const newUser = new this.userModel({ identifier });
    const savedUser = await newUser.save();
    return UserEntity.transform(savedUser).toPrimitives();
  }
}
