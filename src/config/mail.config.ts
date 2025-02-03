import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const getMailConfig = (configService: ConfigService) => ({
  transport: {
    host: configService.get<string>('MAIL_HOST'),
    port: configService.get('MAIL_PORT'),
    secure: configService.get('MAIL_SECURE'),
    auth: {
      user: configService.get<string>('MAIL_USER'),
      pass: configService.get<string>('MAIL_PASSWORD'),
    },
  },
  defaults: {
    from: configService.get<string>('MAIL_FROM'),
  },
  template: {
    dir: path.join(__dirname, '../templates'),
    adapter: new HandlebarsAdapter(),
    options: { strict: true },
  },
  options: {
    partials: {
      dir: path.join(__dirname, '../templates/partials'),
      options: { strict: true },
    },
  },
});
