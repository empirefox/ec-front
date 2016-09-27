import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IGroupBuyItem, GroupBuyService } from '../../core';

@Component({
  selector: 'home-group-buy',
  template: require('./group.html'),
  styles: [require('./group.css')],
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
    this.router.navigate(['./home/1', item.sku.ProductID]);
  }

  img(item: IGroupBuyItem) { return item.Img || item.sku.Img; }

}
