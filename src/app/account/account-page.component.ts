import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../header-bar';

@Component({
  template: require('./account-page.html'),
  styles: [require('./account-page.css')],
  directives: [Header1Component],
})
export class AccountPageComponent {

  constructor(private router: Router) { }

  onGotoSafe() {
    this.router.navigate(['/safe']);
  }

}
