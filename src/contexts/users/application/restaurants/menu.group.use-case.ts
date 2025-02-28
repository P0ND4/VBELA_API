import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/contexts/shared/api.response';
import { Group } from '../../domain/types/common/group.entity';
import { MenuGroupRepositoryEntity } from '../../domain/repositories/restaurants/menu.group.repository.entity';

@Injectable()
export class MenuGroupUseCase {
  constructor(private readonly menuGroupRepository: MenuGroupRepositoryEntity) {}

  async add(identifier: string, menuGroup: Group): Promise<ApiResponse<null>> {
    return await this.menuGroupRepository.add(identifier, menuGroup);
  }

  async edit(identifier: string, id: string, menuGroup: Group): Promise<ApiResponse<null>> {
    return await this.menuGroupRepository.edit(identifier, id, menuGroup);
  }

  async remove(
    identifier: string,
    groupID: string,
  ): Promise<ApiResponse<null>> {
    return await this.menuGroupRepository.remove(identifier, groupID);
  }
}
