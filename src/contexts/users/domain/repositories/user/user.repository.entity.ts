import { ApiResponse } from 'src/contexts/shared/api.response';
import { PrimitiveUser } from '../../user.entity';
import { Permissions } from '../../types';
export abstract class UserRepositoryEntity {
  abstract getUserInformation(
    identifier: string,
    selected: string,
    permissions: Permissions | null,
  ): Promise<ApiResponse<Partial<PrimitiveUser>>>;
  abstract findAndDeleteUserByIdentifier(
    identifier: string,
  ): Promise<ApiResponse<PrimitiveUser | null>>;
}
