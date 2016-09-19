import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: require('./cheyou-detail.html'),
  styles: [require('./cheyou-detail.css')],
})
export class CheyouDetailComponent {

  constructor(private router: Router) { }

  gotoBuy() { this.router.navigateByUrl('/cheyou/buy'); }
  gotoDetail() { this.router.navigateByUrl('/cheyou/detail'); }
  gotoCheyouList() { this.router.navigateByUrl('/cheyou/list'); }
  gotoMy() { this.router.navigateByUrl('/cheyou/my'); }

}
