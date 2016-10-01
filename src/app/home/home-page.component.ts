import { Component } from '@angular/core';
import { constMap, ICarouselItem, CarouselService } from '../core';

@Component({
  selector: 'home-page',
  template: require('./home-page.html'),
  styles: [require('./home-page.css')],
})
export class HomePageComponent {

  items: ICarouselItem[];

  constructor(private carouselService: CarouselService) { }

  ngOnInit() {
    this.carouselService.getItems(constMap.BillboardType.TBillboardAdSlide).subscribe(items => this.items = items);
  }

}
