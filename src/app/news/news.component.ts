import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { constMap, ICarouselItem, CarouselService } from '../core';

import { INewsItem, NewsService } from '../core';

@Component({
  templateUrl: './news.html',
  styleUrls: ['./news.css'],
})
export class NewsComponent {
  slides: ICarouselItem[];
  swipeOptions: any;
  infiniteScrollDisabled: boolean;

  items: INewsItem[] = [];

  constructor(
    private router: Router,
    private carouselService: CarouselService,
    private newsService: NewsService) { }

  ngOnInit() {
    this.carouselService.getItems(constMap.BillboardType.TBillboardNews).subscribe(items => this.slides = items);
    this.swipeOptions = {
      slidesPerView: 1,
      loop: false,
      autoplay: 3000,
      autoplayDisableOnInteraction: false,
      paging: false,
      arrows: false,
    };

    this.newsService.getItems(false).subscribe(items => this.items = items);
  }

  setItems(items: INewsItem[]) {
    if (this.items.length === (items ? items.length : 0)) {
      this.infiniteScrollDisabled = true;
    }
    this.items = items;
  }

  onScroll(next: boolean) {
    this.newsService.getItems(next).subscribe(items => this.items = items);
  }

  trackByItems(index: number, item: INewsItem) { return item.ID; }

  gotoSlide(slide: ICarouselItem) { this.carouselService.gotoSlide(slide); }

  gotoDetail(item: INewsItem) {
    this.router.navigateByUrl(`/news/${item.ID}`);
  }

}
