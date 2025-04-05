import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { Movement } from 'src/contexts/users/domain/types';

@Injectable()
export class MovementEvents {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async events(identifier: string, movements: Movement[]): Promise<void> {
    if (!!movements.length) {
      const movementUpdates = movements.map((movement) => ({
        updateOne: {
          filter: { identifier },
          update: { $push: { movements: movement } },
        },
      }));

      await this.userModel.bulkWrite(movementUpdates);
    }
  }
}
