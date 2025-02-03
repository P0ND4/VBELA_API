import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { TableRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/table.repository.entity';
import { Table } from '../../domain/types';

@Injectable()
export class TableUseCase {
  constructor(private readonly tableRepository: TableRepositoryEntity) {}

  async add(identifier: string, table: Table): Promise<ApiResponse<null>> {
    return await this.tableRepository.add(identifier, table);
  }

  async edit(identifier: string, table: Table): Promise<ApiResponse<null>> {
    return await this.tableRepository.edit(identifier, table);
  }

  async remove(identifier: string, tableID: string): Promise<ApiResponse<null>> {
    return await this.tableRepository.remove(identifier, tableID);
  }
}
