import { ProductService } from './product.service';

export * from './product';
export * from './product.service';
export * from './local.service';
export * from './context.service';

export const PRODUCT_PROVIDERS = [
  ProductService
];
