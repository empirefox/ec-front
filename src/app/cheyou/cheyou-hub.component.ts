import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderBarComponent } from '../header-bar';

@Component({
  template: require('./cheyou-hub.html'),
  styles: [require('./cheyou-hub.css')],
  directives: [HeaderBarComponent],
})
export class CheyouHubComponent {

  constructor(private router: Router) { }

  gotoDetail() { this.router.navigateByUrl('/cheyou/detail'); }
  gotoCheyouList() { this.router.navigateByUrl('/cheyou/list'); }
  gotoMy() { this.router.navigateByUrl('/cheyou/my'); }

}
