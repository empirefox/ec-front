import { Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NavMenuComponent } from './nav-menu.component';

@Component({
  selector: 'header-bar-inner',
  template: require('./header-bar.html'),
  styles: [require('./header-bar.css')],
  directives: [NavMenuComponent],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderBarInnerComponent {

  @Output() back = new EventEmitter<any>();

  showMenu: boolean;

  onGoBack() { this.back.next(0); }

}

@Component({
  selector: 'header-bar',
  template: require('./header-bar.html'),
  directives: [NavMenuComponent],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderBarComponent extends HeaderBarInnerComponent {

  @Input() inner: boolean;

  constructor(private _location: Location) { super(); }

  onGoBack() {
    if (this.inner) {
      this.back.next(0);
    } else {
      this._location.back();
    }
  }

}
