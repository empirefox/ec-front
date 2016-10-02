import { Component } from '@angular/core';
import { constMap, ICarouselItem, CarouselService } from '../core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export class HomePageComponent {

  items: ICarouselItem[];

  constructor(private carouselService: CarouselService) { }

  ngOnInit() {
    this.carouselService.getItems(constMap.BillboardType.TBillboardAdSlide).subscribe(items => this.items = items);
  }

}
