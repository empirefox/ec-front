import { AgoPipe } from './ago.pipe';
import { CdnImgPipe } from './cdn-img.pipe';
import { MoneyPipe, YuanPipe, CentPipe } from './money.pipe';
import { OrderStatePipe } from './order-state.pipe';
import { CashTypePipe } from './cash-type.pipe';

export { AgoPipe } from './ago.pipe';
export { CdnImgPipe } from './cdn-img.pipe';
export { MoneyPipe, YuanPipe, CentPipe } from './money.pipe';
export { OrderStatePipe } from './order-state.pipe';
export { CashTypePipe } from './cash-type.pipe';

export const APP_CORE_PIPES = [
  AgoPipe,
  CdnImgPipe,
  MoneyPipe, YuanPipe, CentPipe,
  OrderStatePipe,
  CashTypePipe,
];
