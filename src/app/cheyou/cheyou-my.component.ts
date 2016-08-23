import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderBarComponent } from '../header-bar';

@Component({
  template: require('./cheyou-my.html'),
  styles: [require('./cheyou-my.css')],
  directives: [HeaderBarComponent],
})
export class CheyouMyComponent {

  constructor(private router: Router) { }

  gotoDetail() { this.router.navigateByUrl('/cheyou/detail'); }
  gotoCheyouList() { this.router.navigateByUrl('/cheyou/list'); }
  gotoMy() { this.router.navigateByUrl('/cheyou/my'); }

}
