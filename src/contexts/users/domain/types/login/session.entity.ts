import { Permissions } from '../collaborators';

export type Session = {
  identifier: string;
  permission: boolean | Permissions;
};
