import { AgoPipe } from './ago.pipe';
import { CdnImgPipe } from './cdn-img.pipe';
import { PriceNoPipe, PricePipe, MoneyPipe, YuanPipe, CentPipe } from './money.pipe';
import { OrderStatePipe } from './order-state.pipe';
import { CashTypePipe } from './cash-type.pipe';

export { AgoPipe } from './ago.pipe';
export { CdnImgPipe } from './cdn-img.pipe';
export { PriceNoPipe, PricePipe, MoneyPipe, YuanPipe, CentPipe } from './money.pipe';
export { OrderStatePipe } from './order-state.pipe';
export { CashTypePipe } from './cash-type.pipe';

export const APP_CORE_PIPES = [
  AgoPipe,
  CdnImgPipe,
  PriceNoPipe, PricePipe, MoneyPipe, YuanPipe, CentPipe,
  OrderStatePipe,
  CashTypePipe,
];
