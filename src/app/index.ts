import { APP_CORE_PROVIDERS } from './core';
// App
export * from './app';
export * from './app.routes';
export * from './app.module';

// Application wide providers
export const APP_PROVIDERS = [
  ...APP_CORE_PROVIDERS,
];
