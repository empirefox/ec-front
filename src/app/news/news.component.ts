import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

import { INewsItem, NewsService } from '../core';

@Component({
  template: require('./news.html'),
  styles: [require('./news.css')],
})
export class NewsComponent {
  items: INewsItem[];

  sub: Subscription;

  constructor(
    private router: Router,
    private newsService: NewsService) { }

  ngOnInit() {
    this.sub = this.newsService.getItems(false).subscribe(items => this.items = items);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onScroll(next: boolean) {
    this.sub.unsubscribe();
    this.sub = this.newsService.getItems(next).subscribe(items => this.items = items);
  }

  trackByItems(index: number, item: INewsItem) { return item.ID; }

}
