import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IDelivery, IDeliveryDay, DeliveryService, OrderService, IOrder } from '../../core';
import { KuaidiItem, kuaidi100map } from './kuaidi100';

@Component({
  template: require('./delivery-page.html'),
  styles: [require('./delivery-page.css')],
})
export class DeliveryPageComponent {

  order: IOrder;
  delivery: IDelivery;
  company: KuaidiItem;

  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService) { }

  ngOnInit() {
    let data = <{ order: IOrder }>this.route.snapshot.data;
    this.order = data.order;
    this.company = kuaidi100map[this.order.DeliverCom];
    this.deliveryService.query(this.order.ID).subscribe(delivery => this.delivery = delivery);
  }

}
