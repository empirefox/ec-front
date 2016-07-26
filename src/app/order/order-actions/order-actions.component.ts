import { Component, Input, Optional, ChangeDetectionStrategy, Output, EventEmitter  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IOrder, OrderService, LocalOrderService } from '../../core';
import { OrderPayComponent } from '../../pay';

@Component({
  selector: 'order-actions',
  template: require('./order-actions.html'),
  styles: [require('./order-actions.css')],
  directives: [OrderPayComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderActionsComponent {

  @Input() order: IOrder;

  @Output() stateChange = new EventEmitter<any>();

  showOrderPay: boolean;
  showEnsureDialog: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    @Optional() private localOrderService: LocalOrderService) { }

  ngOnInit() {
    let showPay = this.router.routerState.snapshot.queryParams['pay'] === 'show';
    let showCurrentPay = (+this.route.snapshot.params['id']) === this.order.ID;
    this.showOrderPay = showPay && showCurrentPay;
  }

  onCancel() { this.changeState('cancel'); }

  gotoDelivery() {
    if (this.localOrderService) {
      this.localOrderService.publish(this.order);
    }
    this.router.navigate(['/order/delivery', this.order.ID]);
  }

  onEnsure() { this.changeState('reciepted'); }

  gotoEval() { this.router.navigate(['/eval', this.order.ID]); }

  private changeState(state: string) {
    this.orderService.changeState(this.order.ID, state).subscribe(order => {
      Object.assign(this.order, order);
      this.stateChange.next(0);
    });
  }

}
