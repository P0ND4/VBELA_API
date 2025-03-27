import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { OrderDTO } from 'src/contexts/users/domain/types';

@Injectable()
export class OrderEvents {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async events(identifier: string, dto: OrderDTO): Promise<void> {
    if (!!dto.movements.length) {
      const movementUpdates = dto.movements.map((movement) => ({
        updateOne: {
          filter: { identifier },
          update: { $push: { movements: movement } },
        },
      }));

      await this.userModel.bulkWrite(movementUpdates);
    }
  }
}
