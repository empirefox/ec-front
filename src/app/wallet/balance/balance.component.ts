import { Component } from '@angular/core';
import { LocalWalletBase } from '../../core';

@Component({
  templateUrl: './balance.html',
  styleUrls: ['./balance.css'],
})
export class BalanceComponent {

  constructor(public base: LocalWalletBase) { }

}
