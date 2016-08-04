export interface IEvalItem {
  Eval?: string;
  EvalAt?: number;
  EvalName?: string;
  RateStar?: number;
  RateFit?: number;
  RateServe?: number;
  RateDeliver?: number;
}

export interface IProductEval {
  items: IEvalItem[];
  good: IEvalItem[];
  common: IEvalItem[];
  bad: IEvalItem[];
  praiseOf: number;
  fit: number;
  serve: number;
  deliver: number;
}
