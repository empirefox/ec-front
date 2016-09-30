import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder, IProfile } from '../../core';

@Component({
  template: require('./order-detail.html'),
  styles: [require('./order-detail.css')],
})
export class OrderDetailComponent implements OnInit {

  order: IOrder;
  phone: string;
  payMethod: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let data = <{ profile: IProfile, order: IOrder }>this.route.snapshot.data;
    this.phone = `tel:${data.profile.Phone}`;
    this.order = data.order;
    this.payMethod = this.order.IsDeliverPay ? '货到付款' : '在线付款';
  }

  gotoChat() { this.router.navigateByUrl('/chat'); }

  onStateChanged() { }

}
