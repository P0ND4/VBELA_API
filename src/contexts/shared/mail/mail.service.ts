import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailDto } from './mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(dto: MailDto) {
    try {
      const res = await this.mailerService.sendMail(dto);
      console.log('Email sent:', res.messageId);
      return { status: HttpStatus.OK, message: 'Correo enviado exitosamente' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
