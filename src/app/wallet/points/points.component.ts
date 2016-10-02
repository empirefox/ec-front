import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPointsItem, LocalWalletBase } from '../../core';

@Component({
  templateUrl: './points.html',
  styleUrls: ['./points.css'],
})
export class PointsComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalWalletBase) { }

}
