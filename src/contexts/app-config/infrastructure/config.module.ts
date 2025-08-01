import { Module } from '@nestjs/common';
import { ConfigModule } from './http-api/v1/config/config.module';

@Module({
  imports: [ConfigModule],
})
export class MainModule {}
