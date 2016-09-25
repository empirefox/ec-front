import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: require('./cheyou-hub.html'),
  styles: [require('./cheyou-hub.css')],
})
export class CheyouHubComponent {

  constructor(private router: Router) { }

  get isDetailActive() {
    return this.router.isActive('cheyou/detail', false);
  }

}
