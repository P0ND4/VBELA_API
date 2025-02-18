import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { Handler } from '../../domain/types/handlers';
import { HandlerRepositoryEntity } from '../../domain/repositories/handlers/handler.repository.entity';

@Injectable()
export class HandlerUseCase {
  constructor(private readonly handlerRepository: HandlerRepositoryEntity) {}

  async add(identifier: string, handler: Handler): Promise<ApiResponse<null>> {
    return await this.handlerRepository.add(identifier, handler);
  }

  async edit(identifier: string, handler: Handler): Promise<ApiResponse<null>> {
    return await this.handlerRepository.edit(identifier, handler);
  }

  async remove(
    identifier: string,
    handlerID: string,
  ): Promise<ApiResponse<null>> {
    return await this.handlerRepository.remove(identifier, handlerID);
  }
}
