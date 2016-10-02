import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalWalletBase } from '../../core';

@Component({
  templateUrl: './balance.html',
  styleUrls: ['./balance.css'],
})
export class BalanceComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalWalletBase) { }

}
