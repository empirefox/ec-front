import { Component } from '@angular/core';
import { LocalWalletBase } from '../../core';

@Component({
  templateUrl: './points.html',
  styleUrls: ['./points.css'],
})
export class PointsComponent {

  constructor(public base: LocalWalletBase) { }

}
