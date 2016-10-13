import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { constMap, ICarouselItem, CarouselService, TokenService } from '../core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export class HomePageComponent {

  items: ICarouselItem[];

  constructor(
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private carouselService: CarouselService) { }

  ngOnInit() {
    let u = this.route.snapshot.queryParams['u'];
    if (u) {
      this.tokenService.redirectLogin().subscribe();
    }
    this.carouselService.getItems(constMap.BillboardType.TBillboardAdSlide).subscribe(items => this.items = items);
  }

}
