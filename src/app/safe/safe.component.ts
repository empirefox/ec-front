import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../header-bar';

@Component({
  template: require('./safe.html'),
  directives: [Header1Component],
})
export class SafeComponent {

  constructor(private router: Router) { }

  onGotoPassword() { }

  onGotoBindPhone() {
    this.router.navigate(['/safe/phone']);
  }

  // account/setpaykey
  onGotoPaypsd() { }

}
