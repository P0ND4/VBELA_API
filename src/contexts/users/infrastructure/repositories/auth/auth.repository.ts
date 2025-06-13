import { HttpStatus, Injectable } from '@nestjs/common';
import {
  AuthRepositoryEntity,
  Session,
} from '../../../domain/repositories/auth/auth.repository.entity';
import { User } from '../../schema/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse, Status } from 'src/contexts/shared/api.response';
import { TemporalTokenService } from '../../services/temporal-token.service';

@Injectable()
export class AuthRepository extends AuthRepositoryEntity {
  constructor(
    @InjectModel(User.name) public userModel: Model<User>,
    private temporalTokenService: TemporalTokenService,
  ) {
    super();
  }

  async getSessions(
    identifier: string,
  ): Promise<ApiResponse<{ sessions: Session[]; token: string }>> {
    const users = await this.userModel.find().exec();

    const userAccount = users.find((u) => u.identifier === identifier);
    const account = userAccount ? { identifier, type: 'user' } : null;

    const collaboratorSessions = users
      .filter((user) =>
        user.collaborators.some((collab) => collab.identifier === identifier),
      )
      .map((user) => ({ identifier: user.identifier, type: 'collaborator' }));

    const sessions: Session[] = [
      ...(account ? [account] : []),
      ...collaboratorSessions,
    ];

    const token = await this.temporalTokenService.generateToken();

    return new ApiResponse(
      Status.Success,
      HttpStatus.OK,
      'Validación de sesión exitosa.',
      { sessions, token },
    );
  }
}
