import { ApiResponse } from 'src/contexts/shared/api.response';

export abstract class VerifyRepositoryEntity {
  abstract verifyEmail(email: string, code: string): Promise<ApiResponse<{ expires_in: number; recipient: string }>>;
}
