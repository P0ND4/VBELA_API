import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoDbConfig } from '../config/database.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMongoDbConfig,
      inject: [ConfigService],
    }),
  ],
})
export class MongooseDatabaseModule {}
