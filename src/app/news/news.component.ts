import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { KSSwiperContainer, KSSwiperSlide } from 'angular2-swiper';
import { ICarouselItem, CarouselService } from '../core';

import { INewsItem, NewsService } from '../core';

@Component({
  template: require('./news.html'),
  styles: [require('./news.css')],
})
export class NewsComponent {
  slides: ICarouselItem[];
  swipeOptions: any;

  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;

  items: INewsItem[];

  sub: Subscription;

  constructor(
    private router: Router,
    private carouselService: CarouselService,
    private newsService: NewsService) { }

  ngOnInit() {
    this.carouselService.getItems('TBillboardNews').subscribe(items => this.slides = items);
    this.swipeOptions = {
      slidesPerView: 1,
      loop: false,
      autoplay: 3000,
      autoplayDisableOnInteraction: false,
    };

    this.sub = this.newsService.getItems(false).subscribe(items => this.items = items);
  }

  ngOnDestroy() {
    if (this.swiperContainer) {
      this.swiperContainer.swiper.stopAutoplay();
    }
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    setTimeout(() => this.swiperContainer.swiper.startAutoplay());
  }

  onScroll(next: boolean) {
    this.sub.unsubscribe();
    this.sub = this.newsService.getItems(next).subscribe(items => this.items = items);
  }

  trackByItems(index: number, item: INewsItem) { return item.ID; }

  gotoSlide(slide: ICarouselItem) { this.carouselService.gotoSlide(slide); }

  gotoDetail(item: INewsItem) {
    this.router.navigateByUrl(`/news/${item.ID}`);
  }

}
