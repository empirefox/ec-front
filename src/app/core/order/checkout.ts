import { IAddress } from '../address';
import { ISku } from '../product';
import { ICheckoutPayloadItem, ICheckoutPayload, IInvoice } from './order';

export interface ICheckoutItem {
  Sku: ISku;
  Quantity: number;
  GroupBuyID?: number;
  GroupBuyPrice?: number;
}

export interface ICheckout {
  Items: ICheckoutItem[];
  Address: IAddress;
  Remark?: string;
  Total: number;
  IsDeliverPay: boolean;
  DeliverFee: number;
  Invoice: IInvoice;
}

export function toPayload(checkout: ICheckout): ICheckoutPayload {
  let addr = checkout.Address;
  return {
    Items: checkout.Items.map(item => {
      let out: ICheckoutPayloadItem = { SkuID: item.Sku.ID, Quantity: item.Quantity };
      if (item.GroupBuyID) {
        out.GroupBuyID = item.GroupBuyID;
        out.GroupBuyPrice = item.GroupBuyPrice;
      }
      return out;
    }),
    Remark: checkout.Remark,
    Total: checkout.Total,
    IsDeliverPay: checkout.IsDeliverPay,
    Invoice: checkout.Invoice,
    Contact: addr.Contact,
    Phone: addr.Phone,
    DeliverFee: checkout.DeliverFee,
    DeliverAddress: `${addr.Province}${addr.City}${addr.District}${addr.House}`,
  };
}
