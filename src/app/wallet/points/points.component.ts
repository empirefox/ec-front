import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Header1Component } from '../../header-bar';
import { AbstractWalletComponent } from '../abstract-wallet.component';
import { MoneyService, LocalWalletService } from '../../core';

@Component({
  selector: 'points',
  template: require('./points.html'),
  directives: [Header1Component],
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
