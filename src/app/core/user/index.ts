import { UserService } from './user.service';

export * from './user';
export * from './user.service';
export * from './trans';

export const USER_PROVIDERS = [
  UserService
];
