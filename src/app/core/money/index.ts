import { MoneyService } from './money.service';
import { WalletResolver } from './money.resolver';

export * from './money';
export * from './money.service';
export * from './money.resolver';
export * from './local.service';

export const MONEY_PROVIDERS = [
  MoneyService,
  WalletResolver,
];
