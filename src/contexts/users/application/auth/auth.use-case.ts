import { HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import {
  AuthRepositoryEntity,
  Session,
} from '../../domain/repositories/auth/auth.repository.entity';
import { ApiResponse, Status } from '../../../shared/api.response';
import { TokenBlacklistService } from '../../infrastructure/services/token-blacklist.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../infrastructure/schema/user/user.schema';
import { Model } from 'mongoose';
import { Token } from '../../domain/token.entity';

@Injectable()
export class AuthUseCase {
  private readonly logger = new Logger(AuthUseCase.name);
  
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private readonly authRepository: AuthRepositoryEntity,
    private tokenBlacklistService: TokenBlacklistService,
    @InjectModel(User.name) public userModel: Model<User>,
  ) {}

  private async getTokenPayload(payload: Omit<Token, 'tokenType'>, message) {
    return new ApiResponse(Status.Success, HttpStatus.CREATED, message, {
      access_token: this.jwtService.sign(
        { ...payload, tokenType: 'access_token' },
        {
          expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION'),
          issuer: 'fappture',
        },
      ),
      refresh_token: this.jwtService.sign(
        { ...payload, tokenType: 'refresh_token' },
        {
          expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRATION'),
          issuer: 'fappture',
        },
      ),
    });
  }

  async refreshToken(
    payload: Omit<Token, 'tokenType'>,
  ): Promise<ApiResponse<{ access_token: string; refresh_token: string }>> {
    return this.getTokenPayload(payload, 'Tokens renovado satisfactoriamente.');
  }

  // En el Guard de CustomStrategy se valida el token temporal y se llama a este método.
  async login(
    identifier,
    selected,
  ): Promise<ApiResponse<{ access_token: string; refresh_token: string }>> {
    const user = await this.userModel.findOne({ identifier: selected }).exec();

    if (!user) throw new NotFoundException('El usuario no existe.');

    const payload: Omit<Token, 'tokenType'> = {
      id: user.id,
      identifier,
      selected,
      permissions: null,
    };

    // Si el identificador original del usuario coincide con la sesión seleccionada
    // quiere decir que es la misma cuenta, por ende tiene todos los permisos.
    if (identifier === selected) payload['permissions'] = null;
    else {
      // Si no, buscamos los permisos del colaborador seleccionado
      const { permissions } =
        user.collaborators.find((c) => c.identifier === identifier) || {};
      payload['permissions'] = permissions;
    }

    return this.getTokenPayload(
      payload,
      'Inició de sesión concedido satisfactoriamente.',
    );
  }

  async getServerTime(): Promise<ApiResponse<{ timestamp: number }>> {
    return new ApiResponse(
      Status.Success,
      HttpStatus.OK,
      'La hora del servidor se recuperó correctamente.',
      { timestamp: Math.floor(Date.now() / 1000) },
    );
  }

  async getSessions(
    identifier: string,
  ): Promise<ApiResponse<{ sessions: Session[]; token: string }>> {
    return await this.authRepository.getSessions(identifier);
  }

  async logout(
    accessToken: string,
    refreshToken: string,
  ): Promise<ApiResponse<null>> {
    try {
      const decodedAccess = this.jwtService.decode(accessToken) as {
        exp: number;
      };
      const decodedRefresh = this.jwtService.decode(refreshToken) as {
        exp: number;
      };

      const now = Math.floor(Date.now() / 1000);

      const accessTokenTtl = Math.max(0, decodedAccess.exp - now);
      const refreshTokenTtl = Math.max(0, decodedRefresh.exp - now);

      const maxTtl = Math.max(accessTokenTtl, refreshTokenTtl);

      await this.tokenBlacklistService.add([accessToken, refreshToken], maxTtl);

      return new ApiResponse(
        Status.Success,
        HttpStatus.OK,
        'Sesión cerrada y tokens invalidados satisfactoriamente.',
        null,
      );
    } catch (error) {
      this.logger.error(`Error durante logout: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al cerrar sesión');
    }
  }
}
