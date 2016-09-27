export interface Consts {
  BillboardType: string[];
  CodedError: string[];
  OrderState: string[];
  TradeState: string[];
  UserCashType: string[];
  VipRebateType: string[];
  VpnType: string[];
}

interface Typer {
  [index: string]: number;
}

export interface ConstMap {
  BillboardType: Typer;
  CodedError: Typer;
  OrderState: Typer;
  TradeState: Typer;
  UserCashType: Typer;
  VipRebateType: Typer;
  VpnType: Typer;
}

const consts: Consts = require('./esecend_consts.json');

let constMap = <ConstMap>{};
Object.keys(consts).forEach(typ => {
  let typer: Typer = {};
  (<string[]>consts[typ]).forEach((value, index) => typer[value] = index);
  constMap[typ] = typer;
});

export {consts, constMap};
