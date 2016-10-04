export interface IQiniuItem {
  key: string;
  putTime?: number;
  hash?: string;
  fsize?: number;
  mimeType?: string;
  customer?: string;

  type?: string;
  year?: number;
  month?: number;
  icon?: string;
}

export interface IQiniuRes {
  marker?: string;
  commonPrefixes?: Array<string>;
  items: Array<IQiniuItem>;
}
