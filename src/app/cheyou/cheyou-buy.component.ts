import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { overlayConfigFactory } from "angular2-modal";
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { config, constMap, IProfile, ProfileService, ISku, IProduct, ProductAttrs, ProductService } from '../core';

@Component({
  template: require('./cheyou-buy.html'),
  styles: [require('./cheyou-buy.css')],
})
export class CheyouBuyComponent {
  profile: IProfile;
  abcs: IProduct[];
  vbuys: IProduct[];

  constructor(
    private router: Router,
    public modal: Modal,
    private profileService: ProfileService,
    private productService: ProductService) { }

  ngOnInit() {
    Observable.forkJoin(
      this.profileService.getProfile().take(1),
      this.productService.getAttrs().take(1),
      this.productService.query({ ft: `Vpn:eq:${constMap.VpnType['TVpnVip']}` }).take(1),
    ).flatMap(([profile, attrs, abcs]: [IProfile, ProductAttrs, IProduct[]]) => {
      this.profile = profile;
      this.abcs = abcs;
      let special = attrs.specials.find(item => item.Name === config.vbuysSpecialName);
      return special ? this.productService.fromSpecial(special.ID).take(1) : Observable.of(null);
    }).subscribe(vbuys => this.vbuys = vbuys);
  }

  getImg(sku: ISku) { return sku.Img || sku.product.Img; }

  getAttrs(sku: ISku) { return sku.attrs.map(attr => attr.Value).join(' '); }

  gotoBuy(sku: ISku) {
    this.router.navigate(['/product/1', sku.product.ID], { queryParams: { SkuID: sku.ID } });
  }

  onModal(content: string, title: string) {
    this.modal.alert()
      .size('lg')
      .showClose(true)
      .title(title)
      .body(content).open();
  }

}
