import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../header-bar';

@Component({
  template: require('./cheyou-detail.html'),
  styles: [require('./cheyou-detail.css')],
  directives: [Header1Component],
})
export class CheyouDetailComponent {

  constructor(private router: Router) { }

  gotoBuy() { this.router.navigateByUrl('/cheyou/buy'); }

}
