import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-menu-list',
  template: require('./nav-menu-list.html'),
  styles: [require('./nav-menu-list.css')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuListComponent {

  constructor(private _router: Router) { }

  onGotoHome() { this._router.navigate(['/home']); }

  onGotoCategory() { this._router.navigate(['/category']); }

  onGotoCart() { this._router.navigate(['/cart']); }

  onGotoMenber() { this._router.navigate(['/member']); }
}
