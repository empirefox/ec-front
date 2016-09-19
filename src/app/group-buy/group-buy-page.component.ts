import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IGroupBuyItem, GroupBuy, GroupBuyService } from '../core';

@Component({
  template: require('./group-buy-page.html'),
  styles: [require('./group-buy-page.css')],
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
