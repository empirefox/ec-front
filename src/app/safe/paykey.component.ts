import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: require('./paykey.html'),
  styles: [require('./paykey.css')],
})
export class PaykeyComponent {

  constructor(private router: Router) { }

  gotoPaykeyForget() { this.router.navigateByUrl('/safe/paykey-forget'); }
  gotoPaykeySet() { this.router.navigateByUrl('/safe/paykey-set'); }

}
