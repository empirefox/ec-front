import { IAddress } from '../address';
import { ISku } from '../product';
import { ICheckoutPayloadItem, ICheckoutPayload, ICheckoutOnePayload, IInvoice } from './order';

export interface ICheckoutItem {
  Sku: ISku;
  Quantity: number;
  GroupBuyID?: number;
  GroupBuyPrice?: number;
}

export interface Invoice {
  To: string;
  IsCom: boolean;
}

export interface ICheckout {
  Items: ICheckoutItem[];
  Address: IAddress;
  Remark?: string;
  Total: number;
  IsDeliverPay: boolean;
  DeliverFee: number;
  Invoice: Invoice;

  vpn: number;
  isPoints: boolean;
  normal: boolean;
  valid: boolean;
}

export function toPayload(checkout: ICheckout): ICheckoutPayload {
  let addr = checkout.Address;
  let data: ICheckoutPayload = {
    Items: checkout.Items.map(item => {
      let attrs = item.Sku.attrs.map(attr => attr.ID);
      let out: ICheckoutPayloadItem = { SkuID: item.Sku.ID, Quantity: item.Quantity, Attrs: attrs };
      if (item.GroupBuyID) {
        out.GroupBuyID = item.GroupBuyID;
      }
      return out;
    }),
    Remark: checkout.Remark,
    Total: checkout.Total,
    IsDeliverPay: checkout.IsDeliverPay,
    Contact: addr.Contact,
    Phone: addr.Phone,
    DeliverFee: checkout.DeliverFee,
    DeliverAddress: `${addr.Province} ${addr.City} ${addr.District} ${addr.House}`,
  };
  if (checkout.Invoice) {
    data.InvoiceTo = checkout.Invoice.To;
    data.InvoiceToCom = checkout.Invoice.IsCom;
  }
  return data;
}

export function toOnePayload(checkout: ICheckout): ICheckoutOnePayload {
  let addr = checkout.Address;
  let item = checkout.Items[0];
  let data: ICheckoutOnePayload = {
    SkuID: item.Sku.ID,
    Attrs: item.Sku.attrs.map(attr => attr.ID),
    Remark: checkout.Remark,
    Contact: addr.Contact,
    Phone: addr.Phone,
    DeliverAddress: `${addr.Province} ${addr.City} ${addr.District} ${addr.House}`,
  };
  if (checkout.Invoice && !checkout.isPoints) {
    data.InvoiceTo = checkout.Invoice.To;
    data.InvoiceToCom = checkout.Invoice.IsCom;
  }
  return data;
}
