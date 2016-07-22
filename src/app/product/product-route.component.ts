import { Component } from '@angular/core';
import { LocalProductService, LocalProductsService } from '../core';

@Component({
  template: `<router-outlet></router-outlet>`,
  providers: [LocalProductsService, LocalProductService],
})
export class ProductRouteComponent {

  constructor(
    private localProductsService: LocalProductsService,
    private localProductService: LocalProductService) { }

  ngOnInit() {
    this.localProductsService.src$.subscribe();
    this.localProductService.src$.subscribe();
    this.localProductsService.publish([]);
  }

}
