import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IOrderItem } from '../../core';

@Component({
  selector: 'order-detail-item',
  templateUrl: './order-detail-item.html',
  styleUrls: ['./order-detail-item.css'],
})
export class OrderDetailItemComponent {

  @Input() item: IOrderItem;

  constructor(private router: Router) { }

  gotoProduct() {
    this.router.navigate(['/product/1', this.item.ProductID]);
  }

}
