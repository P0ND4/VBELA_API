import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';

@Injectable()
export class TwilioService {
  constructor(private readonly configService: ConfigService) {}

  private twilioClient() {
    return twilio(
      this.configService.get<string>('TWILIO_ACCOUNT_SID'),
      this.configService.get<string>('TWILIO_AUTH_TOKEN'),
    );
  }

  async verifyPhone(to: string, channel: string) {
    return await this.twilioClient()
      .verify.v2.services(this.configService.get<string>('TWILIO_SERVICE_SID'))
      .verifications.create({ channel, to });
  }

  async checkPhone(to: string, code: string) {
    return await this.twilioClient()
      .verify.v2.services(this.configService.get<string>('TWILIO_SERVICE_SID'))
      .verificationChecks.create({ to, code });
  }
}
