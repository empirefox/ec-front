import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { constMap, ProductService } from '../../core';

@Component({
  selector: 'home-nav-bar',
  template: require('./nav-bar.html'),
  styles: [require('./nav-bar.css')],
})
export class HomeNavBarComponent {
  specials: Dict<string>;

  constructor(
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAttrs().take(1).subscribe(attrs => this.specials = attrs.specials);
  }

  gotoHot() { this.router.navigate(['./product/list'], { queryParams: { ft: this.specials['hot'] } }); }
  gotoNews() { this.router.navigateByUrl('/news'); }
  gotoNew() { this.router.navigate(['./product/list'], { queryParams: { ft: this.specials['new'] } }); }
  gotoCheyou() { this.router.navigateByUrl('/cheyou'); }
  gotoPoints() { this.router.navigate(['./product/list'], { queryParams: { ft: `Vpn:eq:${constMap.VpnType['TVpnPoints']}` } }); }

}
