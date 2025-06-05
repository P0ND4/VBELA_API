import { Permissions } from './types';

export type Token = {
  id: string;
  identifier: string;
  selected: string;
  tokenType: string;
  permissions: Permissions | null;
};
