import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';

export * from './profile';
export * from './profile.service';
export * from './profile.resolver';

export const PROFILE_PROVIDERS = [
  ProfileService,
  ProfileResolver,
];
