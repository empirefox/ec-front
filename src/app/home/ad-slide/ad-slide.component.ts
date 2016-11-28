import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICarouselItem, CarouselService } from '../../core';

@Component({
  selector: 'home-ad-slide',
  templateUrl: './ad-slide.html',
  styleUrls: ['./ad-slide.css'],
})
export class HomeAdSlideComponent {

  @Input() item: ICarouselItem;

  constructor(
    private router: Router,
    private carouselService: CarouselService) { }

  gotoSlide() { this.carouselService.gotoSlide(this.item); }

}
