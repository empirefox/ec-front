import { CanDeactivateGuard } from './can-deactive-guard';
import { AuthGuard } from './auth-guard';

export * from './can-deactive-guard';
export * from './auth-guard';

export const APP_CORE_INTERFACES = [
  CanDeactivateGuard,
  AuthGuard,
];