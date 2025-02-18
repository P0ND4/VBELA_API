import { Module } from '@nestjs/common';
import { SchemaModule } from '../../../schema/user/shema.module';
import { HandlerController } from './controllers/handler.controller';
import { HandlerRepository } from '../../../repositories/handlers/handler.repository';
import { HandlerRepositoryEntity } from 'src/contexts/users/domain/repositories/handlers/handler.repository.entity';
import { HandlerUseCase } from 'src/contexts/users/application/handlers/handler.use-case';

@Module({
  imports: [SchemaModule],
  controllers: [HandlerController],
  providers: [
    HandlerRepository,
    HandlerUseCase,
    { provide: HandlerRepositoryEntity, useExisting: HandlerRepository },
  ],
})
export class HandlerModule {}
