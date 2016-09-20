import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: require('./account-page.html'),
  styles: [require('./account-page.css')],
})
export class AccountPageComponent {

  constructor(private router: Router) { }

  onGotoSafe() {
    this.router.navigateByUrl('/safe');
  }

}
