import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: require('./cheyou-buy.html'),
  styles: [require('./cheyou-buy.css')],
})
export class CheyouBuyComponent {

  constructor(private router: Router) { }

}
