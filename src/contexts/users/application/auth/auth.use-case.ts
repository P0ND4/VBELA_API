import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepositoryEntity } from '../../domain/repositories/auth/auth.repository.entity';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, Status } from '../../../shared/api.response';
import { TokenBlacklistService } from '../../infrastructure/services/token-blacklist.service';

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly authRepository: AuthRepositoryEntity,
    private jwtService: JwtService,
    private tokenBlacklistService: TokenBlacklistService,
  ) {}

  async getServerTime(): Promise<ApiResponse<{ timestamp: number }>> {
    return new ApiResponse(
      Status.Success,
      HttpStatus.OK,
      'La hora del servidor se recuperó correctamente.',
      { timestamp: Math.floor(Date.now() / 1000) },
    );
  }

  async login(dto: {
    identifier: string;
    collaborator: string | null;
    expoID: string | null;
  }): Promise<ApiResponse<{ access_token: string }>> {
    const user = await this.authRepository.validate(dto);
    const payload = {
      id: user.id,
      identifier: user.identifier,
      collaborator: dto.collaborator,
    };
    return new ApiResponse(
      Status.Success,
      HttpStatus.CREATED,
      'Inició de sesión concedido satisfactoriamente.',
      { access_token: this.jwtService.sign(payload) },
    );
  }

  async logout(token: string): Promise<ApiResponse<null>> {
    await this.tokenBlacklistService.add(token);
    return new ApiResponse(
      Status.Success,
      HttpStatus.OK,
      'Sesión cerrada satisfactoriamente.',
      null,
    );
  }
}
