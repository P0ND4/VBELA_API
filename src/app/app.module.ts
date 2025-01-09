import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { MongooseDatabaseModule } from '../database/mongoose.module';
import { MainModule } from 'src/contexts/users/infrastructure/main.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ThrottlerModule.forRoot([{ ttl: seconds(60), limit: 60 }]),
    MongooseDatabaseModule,
    MainModule
  ],
})
export class AppModule {}
