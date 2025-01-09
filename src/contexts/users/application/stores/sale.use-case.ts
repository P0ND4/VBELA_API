import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/users/domain/api.response';
import { SaleRepositoryEntity } from 'src/contexts/users/domain/repositories/stores/sale.repository.entity';
import { Order } from '../../domain/types';

@Injectable()
export class SaleUseCase {
  constructor(private readonly saleRepository: SaleRepositoryEntity) {}

  async add(identifier: string, sale: Order): Promise<ApiResponse> {
    return await this.saleRepository.add(identifier, sale);
  }

  async edit(identifier: string, sale: Order): Promise<ApiResponse> {
    return await this.saleRepository.edit(identifier, sale);
  }

  async remove(identifier: string, saleID: string): Promise<ApiResponse> {
    return await this.saleRepository.remove(identifier, saleID);
  }
}
