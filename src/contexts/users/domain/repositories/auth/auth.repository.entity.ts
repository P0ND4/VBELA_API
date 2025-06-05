import { ApiResponse } from 'src/contexts/shared/api.response';
import { PrimitiveUser } from '../../user.entity';

export interface Session {
  belongs?: string;
  identifier: string;
  type: string;
};


export abstract class AuthRepositoryEntity {
  abstract getSessions(identifier: string): Promise<ApiResponse<{ sessions: Session[]; token: string }>>;
}
