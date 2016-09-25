export interface consts {
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

export interface constmap {
  BillboardType: Typer;
  CodedError: Typer;
  OrderState: Typer;
  TradeState: Typer;
  UserCashType: Typer;
  VipRebateType: Typer;
  VpnType: Typer;
}

const Consts: consts = require('./esecend_consts.json');

let ConstMap = <constmap>{};
Object.keys(Consts).forEach(typ => {
  let typer: Typer = {};
  (<string[]>Consts[typ]).forEach((value, index) => typer[value] = index);
  ConstMap[typ] = typer;
});

export {Consts, ConstMap};
