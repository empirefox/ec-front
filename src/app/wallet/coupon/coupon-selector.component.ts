import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { ICoupon, CouponService } from '../../core/coupon';

@Component({
  selector: 'coupon-selector',
  template: require('./coupon-selector.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CouponSelectorComponent {

  @Input() storeId: number;

  @Output() select = new EventEmitter<ICoupon>();

  avaliable: ICoupon[];
  unavaliable: ICoupon[];

  coupons: ICoupon[];
  // selected: Dict<boolean> = {};
  selected: ICoupon;

  constructor(private couponService: CouponService) { }

  ngOnInit() {
    this.couponService.getItems().subscribe(items => {
      items = items.filter(item => !item.Used && item.StoreID === this.storeId);
      let now = Date.now() / 1000;
      this.coupons = this.avaliable = items.filter(item => now < item.CreatedAt);
      this.unavaliable = items.filter(item => now >= item.CreatedAt);
    });
  }

  get showEmpty() {
    return !this.coupons.length && this.coupons === this.avaliable;
  }

  onSelect(coupon: ICoupon) {
    // this.selected[coupon.ID] = !this.selected[coupon.ID];
    if (this.selected !== coupon) {
      this.selected = coupon;
    } else {
      this.selected = null;
    }
    this.select.next(this.selected);
  }

}
