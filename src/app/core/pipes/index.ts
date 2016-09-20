import { AgoPipe } from './ago.pipe';
import { MoneyPipe, YuanPipe, CentPipe } from './money.pipe';
import { OrderStatePipe } from './order-state.pipe';

export { AgoPipe } from './ago.pipe';
export { MoneyPipe, YuanPipe, CentPipe } from './money.pipe';
export { OrderStatePipe } from './order-state.pipe';

export const APP_CORE_PIPES = [
  AgoPipe,
  MoneyPipe, YuanPipe, CentPipe,
  OrderStatePipe
];
