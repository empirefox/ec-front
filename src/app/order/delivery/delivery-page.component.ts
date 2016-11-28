import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDelivery, DeliveryService, IOrder } from '../../core';
import { KuaidiItem, kuaidi100map } from './kuaidi100';

@Component({
  templateUrl: './delivery-page.html',
  styleUrls: ['./delivery-page.css'],
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
