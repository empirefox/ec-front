import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../header-bar';

@Component({
  template: require('./safe.html'),
  directives: [Header1Component],
})
export class SafeComponent {

  constructor(private router: Router) { }

  onGotoPassword() { this.router.navigateByUrl('/safe/password'); }
  onGotoBindPhone() { this.router.navigateByUrl('/safe/phone'); }
  onGotoPaypsd() { this.router.navigateByUrl('/safe/paykey'); }

}
