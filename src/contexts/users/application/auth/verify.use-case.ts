import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { VerifyRepositoryEntity } from '../../domain/repositories/auth/verify.repository.entity';
import { MailService } from 'src/contexts/shared/mail/mail.service';
import { ApiResponse, Status } from '../../../shared/api.response';
import { RedisClientType } from 'redis';
import { TwilioService } from 'src/contexts/shared/twilio/twilio.service';

@Injectable()
export class VerifyUseCase {
  constructor(
    private readonly verifyRepository: VerifyRepositoryEntity,
    @Inject('REDIS_VERIFICATION') private redisClient: RedisClientType,
    private readonly mailService: MailService,
    private readonly twilioService: TwilioService,
  ) {}

  protected async registerAttempt(ip: string): Promise<void> {
    const redisKey = `verify:${ip}`;
    const attemptsKey = `${redisKey}:attempts`;
    const blockCountKey = `${redisKey}:block_count`;

    // Incrementar intentos
    const attempts = await this.redisClient.incr(attemptsKey);
    if (attempts === 1) {
      await this.redisClient.expire(attemptsKey, 60); // Expira en 1 minuto
    }

    // Si excede los intentos permitidos, aplicar bloqueo escalable
    if (attempts > 5) {
      const blockCount =
        parseInt((await this.redisClient.get(blockCountKey)) || '0', 10) + 1;

      // Calcular tiempo de bloqueo escalable: 1, 3, 9, 27 minutos...
      const blockTime = Math.pow(3, blockCount) * 60;

      // Registrar bloqueo
      await this.redisClient.set(redisKey, blockTime.toString(), {
        EX: blockTime,
      });
      await this.redisClient.set(blockCountKey, blockCount.toString());
      await this.redisClient.del(attemptsKey); // Reiniciar intentos
    }
  }

  async verifyPhone(
    to: string,
    channel: string,
    ip: string,
  ): Promise<ApiResponse<{ expires_in: number; recipient: string }>> {
    try {
      await this.twilioService.verifyPhone(to, channel);
      await this.registerAttempt(ip);

      return new ApiResponse(
        Status.Success,
        HttpStatus.CREATED,
        'Código de verificación enviado exitosamente.',
        {
          expires_in: 300000,
          recipient: to,
        },
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyEmail(
    email: string,
    ip: string,
  ): Promise<ApiResponse<{ expires_in: number; recipient: string }>> {
    try {
      const code = Math.random().toString().slice(2, 8);
      await this.mailService.sendMail({
        to: email,
        from: 'noreply@nestjs.com',
        subject: `Tu código de verificación es ${code}`,
        template: 'mail/verify',
        context: { code },
      });
      await this.registerAttempt(ip);
      return this.verifyRepository.verifyEmail(email, code);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
