import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalWalletBase } from '../../core';

@Component({
  template: require('./balance.html'),
  styles: [require('./balance.css')],
})
export class BalanceComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalWalletBase) { }

}
