import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'header-bar-inner',
  templateUrl: './header-bar.html',
  styleUrls: ['./header-bar.css'],
})
export class HeaderBarInnerComponent {

  @Output() back = new EventEmitter<any>();

  showMenu: boolean;

  onGoBack() { this.back.next(0); }

}

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.html',
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
