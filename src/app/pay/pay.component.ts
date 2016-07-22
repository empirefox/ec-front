import { Component, Optional, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IWallet, MoneyService, IOrder, OrderService, LocalOrderService, LocalOrdersService } from '../core';

@Component({
  selector: 'order-pay',
  template: require('./pay.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPayComponent {

  @Input() orderId: number;
  @Input() amount: number;

  @Input() show: boolean;
  @Output() showChange = new EventEmitter<boolean>();

  wallet: IWallet;
  canUseDeposit: boolean;
  error: boolean;
  key: string;
  keyControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  private _useDeposit: boolean;

  constructor(
    private router: Router,
    private moneyService: MoneyService,
    private orderService: OrderService,
    @Optional() private localOrderService: LocalOrderService,
    @Optional() private localOrdersService: LocalOrdersService) { }

  get useDeposit(): boolean {
    return this.canUseDeposit && this._useDeposit;
  }
  set useDeposit(use: boolean) {
    this._useDeposit = this.canUseDeposit && use;
  }

  ngOnInit() {
    this.moneyService.getWallet().subscribe(wallet => {
      this.wallet = wallet;
      this.canUseDeposit = this.wallet.Deposit >= this.amount;
    });
  }

  onDismiss() {
    this.error = false;
    this.show = false;
    this.showChange.next(false);
  }

  onSetPayKey() {
    this.router.navigate(['/account/paykey-set'], { queryParams: { OrderID: this.orderId } });
  }

  onPay() {
    this.orderService.pay(this.orderId, this.amount, this.key).subscribe(
      this.payOk,
      _ => this.error = true
    );
  }

  onWxPay() {
    this.orderService.wxPay(this.orderId, this.amount).subscribe(
      this.payOk,
      _ => this.error = true
    );
  }

  private payOk(order: IOrder) {
    if (this.localOrderService) {
      this.localOrderService.publish(order);
    }
    if (this.localOrdersService) {
      this.localOrdersService.src$.take(1).subscribe(items => {
        let index = items.findIndex(item => item.ID == order.ID);
        if (~index) {
          items[index] = order;
        }
        this.localOrdersService.publish([...items]);
      })
    }
    this.router.navigate(['/order/detail', this.orderId]);
  }

}
