import { ApiResponse } from '../../../../shared/api.response';

export abstract class CheckRepositoryEntity {
  abstract checkEmail(email: string, code: string): Promise<ApiResponse<null>>;
}
