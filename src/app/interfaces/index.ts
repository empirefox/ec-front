import { CanDeactivateGuard } from './can-deactive-guard';
import { AuthGuard } from './auth-guard';
import { PhoneRequiredGuard } from './phone-reqired-guard';

export * from './can-deactive-guard';
export * from './auth-guard';
export * from './phone-reqired-guard';

export const APP_CORE_INTERFACES = [
  CanDeactivateGuard,
  AuthGuard,
  PhoneRequiredGuard,
];