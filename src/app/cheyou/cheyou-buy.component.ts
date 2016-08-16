import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../header-bar';

@Component({
  template: require('./cheyou-buy.html'),
  styles: [require('./cheyou-buy.css')],
  directives: [Header1Component],
})
export class CheyouBuyComponent {

  constructor(private router: Router) { }

}
