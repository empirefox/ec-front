import { MoneyService } from './money.service';

export * from './money';
export * from './money.service';
export * from './local.service';

export const MONEY_PROVIDERS = [
  MoneyService
];
