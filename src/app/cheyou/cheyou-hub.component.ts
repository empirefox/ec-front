import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../header-bar';

@Component({
  template: require('./cheyou-hub.html'),
  styles: [require('./cheyou-hub.css')],
  directives: [Header1Component],
})
export class CheyouHubComponent {

  constructor(private router: Router) { }

  gotoDetail() { this.router.navigateByUrl('/cheyou/detail'); }

}
