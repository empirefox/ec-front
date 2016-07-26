import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../header-bar';

@Component({
  template: require('./paykey-forget.html'),
  styles: [require('./paykey-forget.css')],
  directives: [Header1Component],
})
export class PaykeyForgetComponent {

  constructor(private router: Router) { }

}
