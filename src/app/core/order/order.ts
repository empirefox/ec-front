import { ISku, IEvalItem } from '../product';
import { ICoupon } from '../coupon';
import { IAddress } from '../address';

export interface IOrderItem extends IEvalItem {
  ID: number;
  OrderID: number;
  Quantity: number;
  DiscountRate?: number;
  Name: string;
  ProductID: number;
  Img: string;
  Attrs: string;
  Price: number;
  DeliverFee: number;
}

export interface IInvoice {
  To: string;
  IsCom: boolean;
}

export interface IOrderAddress {
  Contact: string;
  Phone: string;
  DeliverAddress: string;
}

export interface IOrder extends IOrderAddress {
  ID: number;
  PaymentAmount: number;
  DiscountValue?: number;
  AbandonedReason?: string;
  TrackingNumber: string;
  Items: IOrderItem[];
  DeliverFee: number;
  DeliverCom: string;
  DeliverNo: string;
  State: string;
  CreatedAt: number;
  CancelledAt?: number;
  PaiedAt?: number;
  DeliveredAt?: number;
  ReceiptedAt?: number;
  ReturnedAt?: number;
  Remark?: string;
  IsDeliverPay: boolean;
  Invoice?: IInvoice;
}

export interface ICheckoutPayloadItem {
  SkuID: number;
  Quantity: number;
  GroupBuyID?: number;
  GroupBuyPrice?: number;
}

export interface ICheckoutPayload extends IOrderAddress {
  Items: ICheckoutPayloadItem[];
  Remark?: string;
  Total: number; // final amount to pay, used to validate
  DeliverFee: number;
  IsDeliverPay: boolean;
  Invoice: IInvoice;
}

export interface IOrderPayClaims {
  UserID: number;
  Amount: number;
  OrderID: number;
  Nonce: string;
  iat: number;
  exp: number;
}

export interface IOrderPayResponse {
  Success: boolean;
  Order?: IOrder;
}
