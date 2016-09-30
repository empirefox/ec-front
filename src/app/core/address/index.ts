import { AddressService } from './address.service';

export * from './address';
export * from './address.service';
export * from './address.resolver';

export const ADDR_PROVIDERS = [
  AddressService,
];
