import { Component } from '@angular/core';
import { LocalOrderService, LocalOrdersService } from '../core';

@Component({
  template: `<router-outlet></router-outlet>`,
  providers: [LocalOrdersService, LocalOrderService],
})
export class OrderRouteComponent {

  constructor(
    private localOrdersService: LocalOrdersService,
    private localOrderService: LocalOrderService) { }

  ngOnInit() {
    this.localOrdersService.src$.subscribe();
    this.localOrderService.src$.subscribe();
  }

}
