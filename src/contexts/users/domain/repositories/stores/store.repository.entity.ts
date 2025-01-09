import { ApiResponse } from '../../api.response';
import { Location } from '../../types';

export abstract class StoreRepositoryEntity {
  abstract add(identifier: string, store: Location): Promise<ApiResponse>;
  abstract edit(identifier: string, store: Location): Promise<ApiResponse>;
  abstract remove(identifier: string, storeID: string): Promise<ApiResponse>;
}
