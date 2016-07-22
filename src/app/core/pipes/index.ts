import { MoneyPipe, YuanPipe, CentPipe } from './money.pipe';
import { OrderStatePipe } from './order-state.pipe';

export { MoneyPipe, YuanPipe, CentPipe } from './money.pipe';
export { OrderStatePipe } from './order-state.pipe';

export const APP_CORE_PIPES = [
  MoneyPipe, YuanPipe, CentPipe,
  OrderStatePipe
];
