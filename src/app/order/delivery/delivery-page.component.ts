import { Component, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { Header1Component } from '../../header-bar';
import { IDelivery, IDeliveryDay, DeliveryService, OrderService, LocalOrderService, LocalOrdersService, IOrder } from '../../core';
import { kuaidi100map } from './kuaidi100';

@Component({
  template: require('./delivery-page.html'),
  directives: [Header1Component],
})
export class DeliveryPageComponent {

  order: IOrder;

  delivery: IDelivery;
  company: string;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private orderService: OrderService,
    @Optional() private localOrderService: LocalOrderService,
    @Optional() private localOrdersService: LocalOrdersService) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.sub = this.orderService.getLocalOrRequest(id, this.localOrderService, this.localOrdersService).
      subscribe(order => {
        this.order = order;
        this.company = kuaidi100map[this.order.DeliverCom].name;
        this.deliveryService.query(this.order.ID).subscribe(delivery => this.delivery = delivery);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
