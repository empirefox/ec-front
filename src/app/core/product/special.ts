export const specialPresets = [
  '爆品', // hot
  '新品', // new
  '特供品', // specialOffer
  '购特色', // featured
  '爱生活', // life
  '推荐', // recommend
];

export interface ISpecial {
  ID: number;
  Name: string;
  Pos: number;
}
