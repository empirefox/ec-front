import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../header-bar';

@Component({
  template: require('./paykey.html'),
  styles: [require('./paykey.css')],
  directives: [Header1Component],
})
export class PaykeyComponent {

  constructor(private router: Router) { }

  gotoPaykeyForget() { this.router.navigateByUrl('/safe/paykey-forget'); }
  gotoPaykeySet() { this.router.navigateByUrl('/safe/paykey-set'); }

}
