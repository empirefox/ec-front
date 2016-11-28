// share between xstorage clients and hub
import { Config } from './config';

import { environment } from '../../../environments/environment';

export const config = new Config(environment);

export interface WxCodeResult {
  code: string;
  state: string;
  user1: string;
}
