import { PrimitiveUser } from '../../user.entity';

export abstract class UserRepositoryEntity {
  abstract findUserByIdentifier(identifier: string): Promise<PrimitiveUser>;
}
