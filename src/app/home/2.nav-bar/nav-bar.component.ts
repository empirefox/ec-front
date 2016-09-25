import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-nav-bar',
  template: require('./nav-bar.html'),
  styles: [require('./nav-bar.css')],
})
export class HomeNavBarComponent {

  constructor(private router: Router) { }

  gotoHot() { this.router.navigate(['./product/list'], { queryParams: { sp: 'hot' } }); }
  gotoNews() { this.router.navigateByUrl('/news'); }
  gotoNew() { this.router.navigate(['./product/list'], { queryParams: { sp: 'new' } }); }
  gotoCheyou() { this.router.navigateByUrl('/cheyou'); }

}
