import { NewsService } from './news.service';

export * from './news';
export * from './news.service';

export const NEWS_PROVIDERS = [
  NewsService,
];
