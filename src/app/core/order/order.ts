import { ISku, IEvalItem } from '../product';
import { ICoupon } from '../coupon';
import { IAddress } from '../address';
import { IWxPayArgs } from '../money';

export interface IOrderItem extends IEvalItem {
  ID: number;
  OrderID: number;
  ProductID: number;
  SkuID: number;
  StoreID: number;
  Vpn: number;
  Quantity: number;
  Price: number;
  CreatedAt: number;
  Name: string;
  Img: string;
  Attrs: string;
  DeliverFee: number;
}

export interface IInvoice {
  InvoiceTo?: string;
  InvoiceToCom?: boolean;
}

export interface IOrderAddress {
  Contact: string;
  Phone: string;
  DeliverAddress: string;
}

export interface IOrder extends IOrderAddress, IInvoice {
  ID: number;
  PayAmount: number;
  WxPaid: number;
  WxRefund: number;
  CashPaid: number;
  CashRefund: number;
  PayPoints: number;
  PointsPaid: number;
  AbandonedReason: string;
  Remark: string;
  Items: IOrderItem[];

  IsDeliverPay: boolean;
  DeliverFee: number;
  DeliverCom: string;
  DeliverNo: string;

  State: number;
  CreatedAt: number;
  CanceledAt: number;
  PaidAt: number;
  PrepaidAt: number;
  PaidCanceledAt: number;
  PickingAt: number;
  DeliveredAt: number;
  ReturnStaredtAt: number;
  ReturnEnsuredAt: number;
  ReturnedAt: number;
  RejectingAt: number;
  RejectBackAt: number;
  RejectRefoundAt: number;
  CompletedAt: number;
  EvalStartedAt: number;
  EvalAt: number;
  HistoryAt: number;

  AutoCompleted: boolean;
  AutoEvaled: boolean;
}

export interface ICheckoutPayloadItem {
  SkuID: number;
  Quantity: number;
  GroupBuyID?: number;
  Attrs: number[];
}

// for non-abc and non-points
export interface ICheckoutPayload extends IOrderAddress, IInvoice {
  Items: ICheckoutPayloadItem[];
  Remark?: string;
  Total: number; // final amount to pay, used to validate
  DeliverFee: number;
  IsDeliverPay: boolean;
}

// only for abc or points
export interface ICheckoutOnePayload extends IOrderAddress, IInvoice {
  SkuID: number;
  Attrs: number[];
  Remark?: string;
}

export interface IOrderChangeStatePayload {
  ID: number;
  State: number;
}

// OrderPrepayPayload
export interface IOrderWxPayPayload {
  OrderID: number;
}

export interface IOrderPrepayResponse {
  Order: IOrder; // without items
  WxPayArgs: IWxPayArgs;
}

export interface IOrderPayPayload {
  Key: string;
  OrderID: number;
  Amount: number;
  IsPoints: boolean;
}

export interface IEvalResponse {
  Order: IOrder; // without items
  Evaled: number;
  EvalAt: number;
  EvalName: string;
}
