import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICarouselItem, CarouselService } from '../../core';

@Component({
  selector: 'home-ad-slide',
  template: require('./ad-slide.html'),
  styles: [require('./ad-slide.css')],
})
export class HomeAdSlideComponent {

  @Input() slide: ICarouselItem;

  constructor(
    private router: Router,
    private carouselService: CarouselService) { }

  gotoSlide() { this.carouselService.gotoSlide(this.slide); }

}
