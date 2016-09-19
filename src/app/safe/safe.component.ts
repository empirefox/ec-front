import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: require('./safe.html'),
})
export class SafeComponent {

  constructor(private router: Router) { }

  onGotoPassword() { this.router.navigateByUrl('/safe/password'); }
  onGotoBindPhone() { this.router.navigateByUrl('/safe/phone'); }
  onGotoPaypsd() { this.router.navigateByUrl('/safe/paykey'); }

}
