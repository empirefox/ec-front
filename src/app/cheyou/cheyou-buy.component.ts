import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import unescape = require('lodash/unescape');

import {
  config, constMap,
  IProfile, ProfileService,
  ISku, IProduct, ProductAttrs, ProductService,
  ModalService,
} from '../core';

@Component({
  templateUrl: './cheyou-buy.html',
  styleUrls: ['./cheyou-buy.css'],
})
export class CheyouBuyComponent {
  profile: IProfile;
  abcs: IProduct[];
  vbuys: IProduct[];

  constructor(
    private router: Router,
    public modal: ModalService,
    private profileService: ProfileService,
    private productService: ProductService) { }

  ngOnInit() {
    Observable.forkJoin(
      this.profileService.getProfile().take(1),
      this.productService.getAttrs().take(1),
      this.productService.query({ ft: `Vpn.eq.${constMap.VpnType.TVpnVip}` }).take(1),
    ).flatMap(([profile, attrs, abcs]: [IProfile, ProductAttrs, IProduct[]]) => {
      this.profile = profile;
      this.abcs = abcs;
      let special = attrs.specials[config.vbuysSpecialName];
      return special ? this.productService.query({ ft: special }).take(1) : Observable.of(null);
    }).subscribe(vbuys => this.vbuys = vbuys);
  }

  getImg(sku: ISku) { return sku.Img || sku.product.Img; }

  getAttrs(sku: ISku) { return sku.attrs.map(attr => attr.Value).join(' '); }

  gotoBuy(sku: ISku) {
    this.productService.setCurrent(sku.product);
    this.router.navigate(['/product/1', sku.product.ID], { queryParams: { SkuID: sku.ID } });
  }

  alert(content: string, title: string) {
    this.modal.alert(unescape(content), title);
  }

}
