import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { Header1Component } from '../../header-bar';
import { IDelivery, IDeliveryDay, DeliveryService, OrderService, OrderContextService, IOrder } from '../../core';
import { DeliveryDayComponent } from './delivery-day.component';
import { kuaidi100map } from './kuaidi100';

@Component({
  template: require('./delivery-page.html'),
  styles: [require('./delivery-page.css')],
  directives: [Header1Component, DeliveryDayComponent],
  providers: [OrderContextService],
})
export class DeliveryPageComponent {

  order: IOrder;

  delivery: IDelivery;
  company: string;

  private sub: Subscription;

  constructor(
    private deliveryService: DeliveryService,
    private orderContextService: OrderContextService) { }

  ngOnInit() {
    this.sub = this.orderContextService.asObservable().subscribe(order => {
      this.order = order;
      this.company = kuaidi100map[this.order.DeliverCom].name;
      this.deliveryService.query(this.order.ID).subscribe(delivery => this.delivery = delivery);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
