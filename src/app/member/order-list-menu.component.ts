import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'order-list-menu',
  styles: [`.member-center dd ul li { width:33.3% }`],
  template: require('./order-list-menu.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListMenuComponent {

  constructor(private router: Router) { }

  onGotoOrderList(view: string) { this.router.navigate(['/order/list'], { queryParams: { view: view } }); }

}
