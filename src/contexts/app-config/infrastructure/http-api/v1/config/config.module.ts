import { Module } from '@nestjs/common';
import { ConfigController } from './controllers/config.controller';

@Module({
  imports: [],
  controllers: [ConfigController],
  providers: [],
})
export class ConfigModule {}
