import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { KSSwiperContainer, KSSwiperSlide } from '../../swiper';
import { ICarouselItem, CarouselService } from '../../core';

@Component({
  selector: 'home-top-bar',
  template: require('./top-bar.html'),
  styles: [require('./top-bar.css')],
  directives: [KSSwiperContainer, KSSwiperSlide],
})
export class HomeTopBarComponent {

  items: ICarouselItem[];
  swipeOptions: any;

  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;

  constructor(
    private router: Router,
    private carouselService: CarouselService) { }

  ngOnInit() {
    this.carouselService.getItems().subscribe(items => this.items = items);
    this.swipeOptions = {
      slidesPerView: 1,
      loop: true,
    };
  }

  onGotoSearch() { this.router.navigateByUrl('/search'); }

}
