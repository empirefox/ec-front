import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';
import { IOrder, OrderContextService } from '../../core';
import { Header1Component } from '../../header-bar';
import { OrderDetailComponent } from './order-detail.component';

@Component({
  template: require('./order-detail-page.html'),
  directives: [Header1Component, OrderDetailComponent],
  providers: [OrderContextService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailPageComponent implements OnInit {

  order: IOrder;

  private sub: Subscription;

  constructor(private orderContextService: OrderContextService) { }

  ngOnInit() {
    this.sub = this.orderContextService.asObservable().subscribe(order => this.order = order);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
