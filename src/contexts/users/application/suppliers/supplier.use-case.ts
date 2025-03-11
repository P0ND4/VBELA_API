import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { SupplierRepositoryEntity } from '../../domain/repositories/suppliers/supplier.repository.entity';
import { Supplier } from '../../domain/types';

@Injectable()
export class SupplierUseCase {
  constructor(private readonly supplierRepository: SupplierRepositoryEntity) {}

  async add(identifier: string, supplier: Supplier): Promise<ApiResponse<null>> {
    return await this.supplierRepository.add(identifier, supplier);
  }

  async edit(identifier: string, id: string, supplier: Supplier): Promise<ApiResponse<null>> {
    return await this.supplierRepository.edit(identifier, id, supplier);
  }

  async remove(identifier: string, supplierID: string): Promise<ApiResponse<null>> {
    return await this.supplierRepository.remove(identifier, supplierID);
  }
}
