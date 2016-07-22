import { OrderService } from './order.service';

export * from './checkout';
export * from './order';
export * from './order.service';
export * from './local.service';

export const ORDER_PROVIDERS = [
  OrderService
];
