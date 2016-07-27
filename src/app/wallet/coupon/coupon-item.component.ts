import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICoupon } from '../../core/coupon';

@Component({
  selector: 'coupon-item',
  template: require('./coupon-item.html'),
})
export class CouponItemComponent {

  @Input() coupon: ICoupon;

}
