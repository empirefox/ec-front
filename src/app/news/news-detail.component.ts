import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

import { INewsItem, NewsService } from '../core';

@Component({
  templateUrl: './news.html',
  styleUrls: ['./news.css'],
})
export class NewsDetailComponent {
  item: INewsItem;
  html: SafeHtml = this.sanitizer.bypassSecurityTrustHtml('');

  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private newsService: NewsService) { }

  ngOnInit() {
    this.sub = this.newsService.getItem(+this.route.snapshot.params['id']).subscribe(item => {
      this.item = item;
      if (item) {
        this.html = this.sanitizer.bypassSecurityTrustHtml(item.Detail);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
