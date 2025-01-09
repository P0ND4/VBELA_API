import { Injectable } from '@nestjs/common';
import { AuthRepositoryEntity } from '../../domain/repositories/auth.repository.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly authRepository: AuthRepositoryEntity,
    private jwtService: JwtService,
  ) {}

  async login(dto: {
    identifier: string;
    expoID: string | null;
  }): Promise<{ access_token: string }> {
    const user = await this.authRepository.validate(dto);
    const payload = { identifier: user.identifier, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
