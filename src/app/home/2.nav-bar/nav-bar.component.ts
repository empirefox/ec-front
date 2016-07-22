import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-nav-bar',
  template: require('./nav-bar.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeNavBarComponent {

  constructor(private router: Router) { }

  onGotoHot() { this.router.navigate(['/product/list'], { queryParams: { sp: 'hot' } }); }
  onGotoRecommend() { this.router.navigate(['/product/list'], { queryParams: { sp: 'recommend' } }); }
  onGotoNew() { this.router.navigate(['/product/list'], { queryParams: { sp: 'new' } }); }

}
