import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { SaleRepositoryEntity } from 'src/contexts/users/domain/repositories/stores/sale.repository.entity';
import { OrderDTO } from '../../domain/types';

@Injectable()
export class SaleUseCase {
  constructor(private readonly saleRepository: SaleRepositoryEntity) {}

  async add(identifier: string, dto: OrderDTO): Promise<ApiResponse<null>> {
    return await this.saleRepository.add(identifier, dto);
  }

  async edit(identifier: string, id: string, dto: OrderDTO): Promise<ApiResponse<null>> {
    return await this.saleRepository.edit(identifier, id, dto);
  }

  async remove(identifier: string, saleID: string): Promise<ApiResponse<null>> {
    return await this.saleRepository.remove(identifier, saleID);
  }
}
