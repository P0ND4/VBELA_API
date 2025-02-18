import { ConfigService } from '@nestjs/config';

export const jwtContants = async (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET'),
  // signOptions: { expiresIn: '15m' },
});
