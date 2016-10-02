import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavMenuListComponent } from '../nav-menu-list';

@Component({
  selector: 'footer-bar',
  templateUrl: './footer-bar.html',
  styleUrls: ['./footer-bar.css'],
})
export class FooterBarComponent {
  @Input() show: boolean = true;

  get display() { return this.show ? 'block' : 'none'; }
}
