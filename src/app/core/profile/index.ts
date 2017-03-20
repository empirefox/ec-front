import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';

export * from '../share';
export * from './urls';
export * from './profile';
export * from './profile.service';
export * from './profile.resolver';

export const PROFILE_PROVIDERS = [
  ProfileService,
  ProfileResolver,
];
