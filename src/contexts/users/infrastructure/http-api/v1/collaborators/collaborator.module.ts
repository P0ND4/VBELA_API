import { Module } from '@nestjs/common';
import { SchemaModule } from '../../../schema/user/shema.module';
import { CollaboratorController } from './controllers/collaborator.controller';
import { CollaboratorRepository } from '../../../repositories/collaborators/collaborator.repository';
import { CollaboratorUseCase } from 'src/contexts/users/application/collaborators/collaborator.use-case';
import { CollaboratorRepositoryEntity } from 'src/contexts/users/domain/repositories/collaborators/collaborator.repository.entity';

@Module({
  imports: [SchemaModule],
  controllers: [CollaboratorController],
  providers: [
    CollaboratorRepository,

    CollaboratorUseCase,

    { provide: CollaboratorRepositoryEntity, useExisting: CollaboratorRepository },
  ],
})
export class CollaboratorModule {}
