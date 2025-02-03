import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepositoryEntity } from '../../domain/repositories/auth/auth.repository.entity';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, Status } from '../../../shared/api.response';

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly authRepository: AuthRepositoryEntity,
    private jwtService: JwtService,
  ) {}

  async login(dto: {
    identifier: string;
    expoID: string | null;
  }): Promise<ApiResponse<{ access_token: string }>> {
    const user = await this.authRepository.validate(dto);
    const payload = { identifier: user.identifier, id: user.id };
    return new ApiResponse(
      Status.Success,
      HttpStatus.CREATED,
      'Inició de sesión concedido satisfactoriamente.',
      { access_token: this.jwtService.sign(payload) },
    );
  }
}
