import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Header1Component } from '../header-bar';
import { AbstractWalletComponent } from '../abstract-wallet.component';

@Component({
  selector: 'points',
  template: require('./points.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [Header1Component],
})
export class PointsComponent extends AbstractWalletComponent { }
