// share between xstorage clients and hub
import { Config, ModeArgs } from './config';

const modeArgs = require(`./${ENV}`);

export const config = new Config(modeArgs);

export interface WxCodeResult {
  code: string;
  state: string;
}
