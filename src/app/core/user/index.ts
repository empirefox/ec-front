import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

export * from './user';
export * from './user.service';
export * from './user.resolver';
export * from './trans';

export const USER_PROVIDERS = [
  UserService,
  UserResolver,
];
