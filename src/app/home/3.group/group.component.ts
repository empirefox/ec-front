import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IGroupBuyItem, GroupBuyService } from '../../core';

@Component({
  selector: 'home-group-buy',
  template: require('./group-buy.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeGroupBuyComponent {

  items: IGroupBuyItem[];

  constructor(
    private router: Router,
    private groupBuyService: GroupBuyService) { }

  ngOnInit() {
    this.groupBuyService.getItems().subscribe(gb => this.items = gb.active.slice(0, 3));
  }

  onGotoGroupBuy() { this.router.navigate(['/groupbuy']); }

  onGotoProduct(item: IGroupBuyItem) {
    this.router.navigate(['/product/1', item.Sku.ProductID]);
  }

  img(item: IGroupBuyItem) { return item.Img || item.Sku.Img; }

}
