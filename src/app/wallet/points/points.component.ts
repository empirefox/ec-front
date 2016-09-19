import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractWalletComponent } from '../abstract-wallet.component';
import { MoneyService, LocalWalletService } from '../../core';

@Component({
  selector: 'points',
  template: require('./points.html'),
})
export class PointsComponent extends AbstractWalletComponent {

    constructor(
      route: ActivatedRoute,
      router: Router,
      moneyService: MoneyService,
      localWalletService: LocalWalletService) {
      super(route, router, moneyService, localWalletService);
    }

}
