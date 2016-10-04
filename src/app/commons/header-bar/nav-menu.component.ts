import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NavMenuListComponent } from '../nav-menu-list';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.html',
  styleUrls: ['./nav-menu.css'],
})
export class NavMenuComponent {
  @Input() show: boolean;

  get display() { return this.show ? 'block' : 'none'; }
}
