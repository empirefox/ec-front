import { CommonQuery } from '../profile';

export interface INewsQuery extends CommonQuery { }

export interface INewsItem {
  ID: number;
  Icon: string;
  Title: string;
  Detail: string;
  CreatedAt: number;
}
