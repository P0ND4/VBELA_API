import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { OrderRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/order.repository.entity';
import { OrderDTO } from '../../domain/types';

@Injectable()
export class OrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryEntity) {}

  async add(identifier: string, dto: OrderDTO): Promise<ApiResponse<null>> {
    return await this.orderRepository.add(identifier, dto);
  }

  async edit(identifier: string, id: string, dto: OrderDTO): Promise<ApiResponse<null>> {
    return await this.orderRepository.edit(identifier, id, dto);
  }

  async remove(identifier: string, orderID: string): Promise<ApiResponse<null>> {
    return await this.orderRepository.remove(identifier, orderID);
  }
}
