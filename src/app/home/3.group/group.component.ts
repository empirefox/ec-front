import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IGroupBuyItem, GroupBuyService, APP_CORE_PIPES } from '../../core';

@Component({
  selector: 'home-group-buy',
  template: require('./group.html'),
  styles: [require('./group.css')],
  pipes: [...APP_CORE_PIPES],
})
export class HomeGroupBuyComponent {

  items: IGroupBuyItem[];

  constructor(
    private router: Router,
    private groupBuyService: GroupBuyService) { }

  ngOnInit() {
    this.groupBuyService.getItems().filter(gb => !!gb).subscribe(gb => this.items = gb.active.slice(0, 3));
  }

  onGotoGroupBuy() { this.router.navigateByUrl('/groupbuy'); }

  onGotoProduct(item: IGroupBuyItem) {
    this.router.navigate(['./home/1', item.Sku.ProductID]);
  }

  img(item: IGroupBuyItem) { return item.Img || item.Sku.Img; }

}
