import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: require('./reward.html'),
  styles: [require('./reward.css')],
})
export class RewardComponent {

  constructor(private router: Router) { }

}
