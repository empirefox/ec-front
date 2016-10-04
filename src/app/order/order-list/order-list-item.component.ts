import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder, OrderService } from '../../core';

@Component({
  selector: 'order-list-item',
  templateUrl: './order-list-item.html',
  styleUrls: ['./order-list-item.css'],
})
export class OrderListItemComponent {

  @Input() order: IOrder;

  constructor(
    private router: Router,
    private orderService: OrderService) { }

  gotoDetail() {
    this.router.navigate(['/order/detail', this.order.ID]);
  }

  onStateChanged() { }

}
