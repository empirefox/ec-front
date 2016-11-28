import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { constMap, IOrder, OrderService } from '../../core';

const states = constMap.OrderState;

@Component({
  selector: 'order-actions',
  templateUrl: './order-actions.html',
  styleUrls: ['./order-actions.css'],
})
export class OrderActionsComponent {

  @Input() order: IOrder;

  @Output() stateChange = new EventEmitter<any>();
  @Output() payChange = new EventEmitter<boolean>();

  _showOrderPay: boolean;
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

  get showOrderPay() { return this._showOrderPay; }
  set showOrderPay(show: boolean) {
    this._showOrderPay = show;
    this.payChange.next(show);
  }

  get state() {
    switch (this.order.State) {
      case states.TOrderStatePrepaid:
        return states.TOrderStateNopay;

      case states.TOrderStatePicking:
        return states.TOrderStatePaid;

      case states.TOrderStateEvalStarted:
        return states.TOrderStateCompleted;

      case states.TOrderStateRejectBack:
      case states.TOrderStateRejectRefound:
      case states.TOrderStateReturnStarted:
      case states.TOrderStateReturning:
      case states.TOrderStateReturned:
        return states.TOrderStateRejecting;

      default:
        return this.order.State;
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
