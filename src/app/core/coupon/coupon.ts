export interface ICoupon {
  ID: number;
  Money: number;
  StoreID: number;
  Store: string;
  Cond: number;
  CreatedAt: number;
  Begin: number;
  End: number;
  Blue?: boolean;
  Used?: boolean;
}
