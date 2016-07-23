export interface ICategory {
  ID: number;
  ParentID?: number;
  Name: string;
  Img: string;
  Pos: number;

  children?: ICategory[];
}
