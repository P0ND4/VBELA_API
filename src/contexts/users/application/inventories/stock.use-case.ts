import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { StockRepositoryEntity } from 'src/contexts/users/domain/repositories/inventories/stock.repository.entity';
import { Movement, Stock } from '../../domain/types';


@Injectable()
export class StockUseCase {
  constructor(private readonly stockRepository: StockRepositoryEntity) {}

  async add(identifier: string, stock: Stock): Promise<ApiResponse<null>> {
    return await this.stockRepository.add(identifier, stock);
  }

  async edit(identifier: string, id: string, stock: Stock): Promise<ApiResponse<null>> {
    return await this.stockRepository.edit(identifier, id, stock);
  }

  async remove(identifier: string, stockID: string): Promise<ApiResponse<null>> {
    return await this.stockRepository.remove(identifier, stockID);
  }
}
