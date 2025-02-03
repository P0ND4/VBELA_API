import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { MenuRepositoryEntity } from 'src/contexts/users/domain/repositories/restaurants/menu.repository.entity';
import { Element } from '../../domain/types';

@Injectable()
export class MenuUseCase {
  constructor(private readonly menuRepository: MenuRepositoryEntity) {}

  async add(identifier: string, menu: Element): Promise<ApiResponse<null>> {
    return await this.menuRepository.add(identifier, menu);
  }

  async edit(identifier: string, menu: Element): Promise<ApiResponse<null>> {
    return await this.menuRepository.edit(identifier, menu);
  }

  async remove(identifier: string, menuID: string): Promise<ApiResponse<null>> {
    return await this.menuRepository.remove(identifier, menuID);
  }
}
