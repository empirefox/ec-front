import { Component, Input, Optional, ChangeDetectionStrategy, Output, EventEmitter  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { constMap, IOrder, OrderService } from '../../core';

const states = constMap.OrderState;

@Component({
  selector: 'order-actions',
  template: require('./order-actions.html'),
  styles: [require('./order-actions.css')],
})
export class OrderActionsComponent {

  @Input() order: IOrder;

  @Output() stateChange = new EventEmitter<any>();

  showOrderPay: boolean;
  showEnsureDialog: boolean;

  states = states;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
    let showPay = this.route.snapshot.queryParams['pay'] === 'show';
    let showCurrentPay = (+this.route.snapshot.params['id']) === this.order.ID;
    this.showOrderPay = showPay && showCurrentPay;
  }

  get state() {
    switch (this.order.State) {
      case states.TOrderStatePrepaid:
        return states.TOrderStateNopay;

      case states.TOrderStatePicking:
        return states.TOrderStatePaid;

      case states.TOrderStateEvalStarted:
        return states.TOrderStateCompleted;

      case states.TOrderStateRejectBack, states.TOrderStateRejectRefound,
        states.TOrderStateReturnStarted, states.TOrderStateReturning, states.TOrderStateReturned:
        return states.TOrderStateRejecting;
    }
  }

  onCancel() { this.changeState(states.TOrderStateCanceled); }

  onEnsure() { this.changeState(states.TOrderStateCompleted); }

  onReturn() { this.changeState(states.TOrderStateReturnStarted); }

  gotoDelivery() { this.router.navigate(['/order/delivery', this.order.ID]); }

  gotoEval() { this.router.navigate(['/order/eval', this.order.ID]); }

  private changeState(state: number) {
    this.orderService.changeState(this.order, state).subscribe(order => this.stateChange.next(0));
  }

}
