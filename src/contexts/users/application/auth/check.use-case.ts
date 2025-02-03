import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CheckRepositoryEntity } from '../../domain/repositories/auth/check.repository.entity';
import { TwilioService } from 'src/contexts/shared/twilio/twilio.service';
import { ApiResponse, Status } from '../../../shared/api.response';

@Injectable()
export class CheckUseCase {
  constructor(
    private readonly checkRepository: CheckRepositoryEntity,
    private readonly twilioService: TwilioService,
  ) {}

  async checkEmail(email: string, code: string): Promise<ApiResponse<null>> {
    return this.checkRepository.checkEmail(email, code);
  }

  async checkPhone(to: string, code: string): Promise<ApiResponse<null>> {
    try {
      const res = await this.twilioService.checkPhone(to, code);
      return new ApiResponse(
        res.valid ? Status.Success : Status.Denied,
        res.valid ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        res.valid ? 'Verificación exitosa.' : 'Código no encontrado.',
        null,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
