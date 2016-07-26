import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'order-list-menu',
  styles: [require('./order-list-menu.css')],
  template: require('./order-list-menu.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListMenuComponent {

  constructor(private router: Router) { }

  onGotoOrderList(view: string) { this.router.navigate(['/order/list'], { queryParams: { view: view } }); }

}
