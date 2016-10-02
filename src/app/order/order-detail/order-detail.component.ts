import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder, IProfile, ModalService } from '../../core';

@Component({
  template: require('./order-detail.html'),
  styles: [require('./order-detail.css')],
})
export class OrderDetailComponent implements OnInit {

  order: IOrder;
  profile: IProfile;
  phone: string;
  payMethod: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modal: ModalService) { }

  ngOnInit() {
    let data = <{ profile: IProfile, order: IOrder }>this.route.snapshot.data;
    this.profile = data.profile;
    this.phone = `tel:${data.profile.Phone}`;
    this.order = data.order;
    this.payMethod = this.order.IsDeliverPay ? '货到付款' : '在线付款';
  }

  gotoChat() { this.modal.alert(this.profile.WxMpName, '请进入微信公众号'); }

  onStateChanged() { }

}
