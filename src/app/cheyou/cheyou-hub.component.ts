import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './cheyou-hub.html',
  styleUrls: ['./cheyou-hub.css'],
})
export class CheyouHubComponent {

  constructor(private router: Router) { }

  get isDetailActive() {
    return this.router.isActive('cheyou/detail', false);
  }

}
