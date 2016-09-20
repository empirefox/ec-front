import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: require('./paykey-forget.html'),
  styles: [require('./paykey-forget.css')],
})
export class PaykeyForgetComponent {

  constructor(private router: Router) { }

}
