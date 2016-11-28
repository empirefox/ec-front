import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { constMap, ICarouselItem, CarouselService } from '../../core';

@Component({
  selector: 'home-top-bar',
  templateUrl: './top-bar.html',
  styleUrls: ['./top-bar.css'],
})
export class HomeTopBarComponent {

  items: ICarouselItem[];
  swipeOptions: any;

  constructor(
    private router: Router,
    private carouselService: CarouselService) { }

  ngOnInit() {
    this.carouselService.getItems(constMap.BillboardType.TBillboardHome).subscribe(items => this.items = items);
    this.swipeOptions = {
      slidesPerView: 1,
      loop: false,
      autoplay: 3000,
      autoplayDisableOnInteraction: false,
      paging: false,
      arrows: false,
    };
  }

  gotoSearch() { this.router.navigateByUrl('/search'); }
  gotoSlide(item: ICarouselItem) { this.carouselService.gotoSlide(item); }
}
