import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPointsItem, LocalWalletBase } from '../../core';

@Component({
  template: require('./points.html'),
  styles: [require('./points.css')],
})
export class PointsComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalWalletBase) { }

}
