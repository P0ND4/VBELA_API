import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/users/domain/api.response';
import { OrderRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/order.repository.entity';
import { Order } from '../../domain/types';

@Injectable()
export class OrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryEntity) {}

  async add(identifier: string, order: Order): Promise<ApiResponse> {
    return await this.orderRepository.add(identifier, order);
  }

  async edit(identifier: string, order: Order): Promise<ApiResponse> {
    return await this.orderRepository.edit(identifier, order);
  }

  async remove(identifier: string, orderID: string): Promise<ApiResponse> {
    return await this.orderRepository.remove(identifier, orderID);
  }
}
