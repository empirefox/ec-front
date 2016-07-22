import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../header-bar';

@Component({
  template: require('./paykey-set.html'),
  directives: [Header1Component],
})
export class PaykeySetComponent {

  constructor(private router: Router) { }

}
