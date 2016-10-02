import { ProductService } from './product.service';

export * from './eval';
export * from './special';
export * from './product';
export * from './product.service';
export * from './local.service';
export * from './product-base';

export const PRODUCT_PROVIDERS = [
  ProductService,
];
