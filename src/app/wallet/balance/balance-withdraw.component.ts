import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IWallet, LocalWalletBase, MoneyService } from '../../core';

// http://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html
export function createRangeValidator(wallet: IWallet, minValue: number) {
  return (c: FormControl) => {
    let err = {
      rangeError: {
        given: c.value,
        max: wallet.cash,
        min: minValue,
      }
    };

    return (c.value > wallet.cash || c.value < minValue) ? err : null;
  };
}

@Component({
  templateUrl: './balance-withdraw.html',
  styleUrls: ['./balance-withdraw.css'],
})
export class BalanceWithdrawComponent {

  amount: FormControl;

  requesting: boolean;
  error: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalWalletBase,
    private moneyService: MoneyService) { }

  ngOnInit() {
    this.amount = new FormControl('', [Validators.required, createRangeValidator(this.base.wallet, 100)]);
  }

  onWithdraw() {
    if (this.amount.valid && !this.requesting) {
      this.error = '';
      this.requesting = true;
      this.moneyService.withdraw(+this.amount.value).subscribe(
        cash => {
          this.requesting = false;
          this.moneyService.addCash(this.base.wallet, cash);
          this.router.navigateByUrl('/wallet');
        },
        err => {
          this.requesting = false;
          this.error = err;
        },
      );
    }
  }

}
