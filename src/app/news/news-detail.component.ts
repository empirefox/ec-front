import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as unescape from 'lodash/unescape';

import { INewsItem, NewsService } from '../core';

@Component({
  templateUrl: './news-detail.html',
  styleUrls: ['./news-detail.css'],
})
export class NewsDetailComponent {
  item: INewsItem;
  html: SafeHtml;

  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private newsService: NewsService) { }

  ngOnInit() {
    this.sub = this.newsService.getItem(+this.route.snapshot.params['id']).subscribe(item => {
      this.item = item;
      if (item) {
        this.html = this.sanitizer.bypassSecurityTrustHtml(unescape(item.Detail));
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
