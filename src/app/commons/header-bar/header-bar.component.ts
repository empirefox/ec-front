import { Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NavMenuComponent } from './nav-menu.component';

@Component({
  selector: 'header-bar-inner',
  templateUrl: './header-bar.html',
  styleUrls: ['./header-bar.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderBarInnerComponent {

  @Output() back = new EventEmitter<any>();

  showMenu: boolean;

  onGoBack() { this.back.next(0); }

}

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.html',
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
