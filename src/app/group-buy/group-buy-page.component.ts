import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../header-bar';
import { IGroupBuyItem, GroupBuy, GroupBuyService } from '../core';
import { GroupBuyItemComponent } from './group-buy-item.component';

@Component({
  template: require('./group-buy-page.html'),
  directives: [Header1Component, GroupBuyItemComponent],
})
export class GroupBuyPageComponent {

  active: IGroupBuyItem[];
  inactive: IGroupBuyItem[];
  current: IGroupBuyItem[];

  constructor(
    private router: Router,
    private groupBuyService: GroupBuyService) { }

  ngOnInit() {
    this.groupBuyService.getItems().filter(gb => !!gb).subscribe(gb => {
      this.current = this.active = gb.active;
      this.inactive = gb.inactive;
    });
  }

}
