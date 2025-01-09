import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/users/domain/api.response';
import { ProductRepositoryEntity } from 'src/contexts/users/domain/repositories/stores/product.repository.entity';
import { Element } from '../../domain/types';

@Injectable()
export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryEntity) {}

  async add(identifier: string, product: Element): Promise<ApiResponse> {
    return await this.productRepository.add(identifier, product);
  }

  async edit(identifier: string, product: Element): Promise<ApiResponse> {
    return await this.productRepository.edit(identifier, product);
  }

  async remove(identifier: string, productID: string): Promise<ApiResponse> {
    return await this.productRepository.remove(identifier, productID);
  }
}
