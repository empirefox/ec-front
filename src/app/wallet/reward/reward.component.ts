import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../../header-bar';

@Component({
  template: require('./reward.html'),
  styles: [require('./reward.css')],
  directives: [Header1Component],
})
export class RewardComponent {

  constructor(private router: Router) { }

}
