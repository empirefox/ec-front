import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NavMenuListComponent } from '../nav-menu-list';

@Component({
  selector: 'nav-menu',
  template: require('./nav-menu.html'),
  directives: [NavMenuListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuComponent {
  @Input() show: boolean;

  get display() { return this.show ? 'block' : 'none'; }
}
