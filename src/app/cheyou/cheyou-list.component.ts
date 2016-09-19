import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: require('./cheyou-list.html'),
  styles: [require('./cheyou-list.css')],
})
export class CheyouListComponent {

  constructor(private router: Router) { }

  gotoDetail() { this.router.navigateByUrl('/cheyou/detail'); }
  gotoCheyouList() { this.router.navigateByUrl('/cheyou/list'); }
  gotoMy() { this.router.navigateByUrl('/cheyou/my'); }

}
