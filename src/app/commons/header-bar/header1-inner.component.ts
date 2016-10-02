import { Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { HeaderBarInnerComponent } from './header-bar.component';

@Component({
  selector: 'header1-inner',
  templateUrl: './header1-inner.html',
  styleUrls: ['./header1-inner.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Header1InnerComponent {

  @Output() back = new EventEmitter<any>();

  onGoBack() { this.back.next(0); }

}
