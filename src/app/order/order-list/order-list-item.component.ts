import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder, LocalOrderService } from '../../core';

@Component({
  selector: 'order-list-item',
  template: require('./order-list-item.html'),
  styles: [require('./order-list-item.css')],
})
export class OrderListItemComponent {

  @Input() order: IOrder;

  constructor(
    private router: Router,
    private localOrderService: LocalOrderService) { }

  gotoDetail() {
    this.localOrderService.publish(this.order);
    this.router.navigate(['/order/detail', this.order.ID]);
  }

  onStateChanged() { }

}
