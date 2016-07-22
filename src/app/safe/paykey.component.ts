import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../header-bar';

@Component({
  template: require('./paykey.html'),
  directives: [Header1Component],
})
export class PaykeyComponent {

  constructor(private router: Router) { }

}
