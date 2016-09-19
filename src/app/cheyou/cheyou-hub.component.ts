import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: require('./cheyou-hub.html'),
  styles: [require('./cheyou-hub.css')],
})
export class CheyouHubComponent {

  constructor(private router: Router) { }

  gotoDetail() { this.router.navigateByUrl('/cheyou/detail'); }
  gotoCheyouList() { this.router.navigateByUrl('/cheyou/list'); }
  gotoMy() { this.router.navigateByUrl('/cheyou/my'); }

}
