import { ApiResponse } from '../../../../shared/api.response';
import { Location } from '../../types';

export abstract class StoreRepositoryEntity {
  abstract add(identifier: string, store: Location): Promise<ApiResponse<null>>;
  abstract edit(identifier: string, id: string, store: Location): Promise<ApiResponse<null>>;
  abstract remove(identifier: string, storeID: string): Promise<ApiResponse<null>>;
}
