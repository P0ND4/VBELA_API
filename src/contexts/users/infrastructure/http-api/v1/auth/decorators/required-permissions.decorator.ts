import { SetMetadata } from '@nestjs/common';
import { Permissions } from 'src/contexts/users/domain/types';

export const REQUIRED_PERMISSIONS_KEY = 'required_permissions';

export const RequiredPermissions = (
  permissions: Array<keyof Permissions>,
  inherit = true,
) => SetMetadata(REQUIRED_PERMISSIONS_KEY, { permissions, inherit });
