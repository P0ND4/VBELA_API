import { ApiResponse } from 'src/contexts/shared/api.response';
import { PrimitiveUser } from '../../user.entity';

export abstract class UserRepositoryEntity {
  abstract findUserByIdentifier(
    identifier: string,
  ): Promise<ApiResponse<PrimitiveUser | null>>;
  abstract findAndDeleteUserByIdentifier(
    identifier: string,
  ): Promise<ApiResponse<PrimitiveUser | null>>;
}
