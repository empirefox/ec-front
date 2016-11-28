import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'order-list-menu',
  styleUrls: ['./order-list-menu.css'],
  templateUrl: './order-list-menu.html',
})
export class OrderListMenuComponent {

  constructor(private router: Router) { }

  onGotoOrderList(view: string) { this.router.navigate(['/order/list'], { queryParams: { view: view } }); }

}
