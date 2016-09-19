import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: require('./paykey-set.html'),
  styles: [require('./paykey-set.css')],
})
export class PaykeySetComponent {

  constructor(private router: Router) { }

}
