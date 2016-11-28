import { Component } from '@angular/core';
import { IGroupBuyItem, GroupBuyService } from '../core';

@Component({
  templateUrl: './group-buy-page.html',
  styleUrls: ['./group-buy-page.css'],
})
export class GroupBuyPageComponent {

  active: IGroupBuyItem[];
  inactive: IGroupBuyItem[];
  current: IGroupBuyItem[];

  constructor(
    private groupBuyService: GroupBuyService) { }

  ngOnInit() {
    this.groupBuyService.getItems().filter(gb => !!gb).subscribe(gb => {
      this.current = this.active = gb.active;
      this.inactive = gb.inactive;
    });
  }

}
