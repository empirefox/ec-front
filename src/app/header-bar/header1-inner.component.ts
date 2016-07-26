import { Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { HeaderBarInnerComponent } from './header-bar.component';

@Component({
  selector: 'header1-inner',
  template: require('./header1-inner.html'),
  styles: [require('./header1-inner.css')],
  directives: [HeaderBarInnerComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header1InnerComponent {

  @Output() back = new EventEmitter<any>();

  onGoBack() { this.back.next(0); }

}
