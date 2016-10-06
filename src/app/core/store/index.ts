import { StoreService } from './store.service';
import { StoreResolver } from './store.resolver';

export * from './store';
export * from './store.service';
export * from './store.resolver';

export const STORE_PROVIDERS = [
  StoreService,
  StoreResolver,
];
