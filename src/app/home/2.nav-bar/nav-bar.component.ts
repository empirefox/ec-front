import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { constMap } from '../core';

@Component({
  selector: 'home-nav-bar',
  template: require('./nav-bar.html'),
  styles: [require('./nav-bar.css')],
})
export class HomeNavBarComponent {

  constructor(private router: Router) { }

  gotoHot() { this.router.navigate(['./product/list'], { queryParams: { ft: 'SpecialID:eq:hot' } }); }
  gotoNews() { this.router.navigateByUrl('/news'); }
  gotoNew() { this.router.navigate(['./product/list'], { queryParams: { ft: 'SpecialID:eq:new' } }); }
  gotoCheyou() { this.router.navigateByUrl('/cheyou'); }
  gotoPoints() { this.router.navigate(['./product/list'], { queryParams: { ft: `Vpn:eq:${constMap.VpnType['TVpnPoints']}` } }); }

}
