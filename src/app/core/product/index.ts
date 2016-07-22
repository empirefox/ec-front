import { ProductService } from './product.service';

export * from './product';
export * from './product.service';
export * from './local.service';

export const PRODUCT_PROVIDERS = [
  ProductService
];
