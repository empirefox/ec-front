export interface IDeliveryItem {
  time: string;
  context: string;

  date: string;
  second: string;
}

export interface IDeliveryDay {
  date: string;
  items: IDeliveryItem[];
}

export interface IDelivery {
  message: string;
  status: number;
  state: number;
  data: IDeliveryItem[];

  days: IDeliveryDay[];
}
