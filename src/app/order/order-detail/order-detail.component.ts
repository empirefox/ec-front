import { Component, Input, OnInit } from '@angular/core';
import { IOrder, ProfileService } from '../../core';
import { OrderActionsComponent } from '../order-actions';
import { OrderDetailItemComponent } from './order-detail-item.component';

@Component({
  selector: 'order-detail',
  template: require('./order-detail.html'),
  styles: [require('./order-detail.css')],
  directives: [OrderActionsComponent, OrderDetailItemComponent],
})
export class OrderDetailComponent implements OnInit {

  @Input() order: IOrder;
  phone: string;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile().take(1).subscribe(profile => this.phone = `tel:${profile.Phone}`);
  }

  get payMethod() {
    return this.order.IsDeliverPay ? '货到付款' : '在线付款';
  }

  onGotoChat() { }

  onStateChanged() { }

}
