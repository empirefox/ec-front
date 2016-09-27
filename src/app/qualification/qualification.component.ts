import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';

import { constMap, IProfile, ProfileService, IVipRebateOrigin, MyVips, VipService, VipRebatePayload, MoneyService } from '../core';

@Component({
  template: require('./qualification.html'),
  styles: [require('./qualification.css')],
})
export class QualificationComponent {

  profile: IProfile;
  current: IVipRebateOrigin;
  vips: IVipRebateOrigin[];
  qualifications: IVipRebateOrigin[];

  selected: IVipRebateOrigin[] = [];

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private vipService: VipService,
    private moneyService: MoneyService) { }

  ngOnInit() {
    this.sub = Observable.forkJoin(
      this.profileService.getProfile().take(1),
      this.vipService.getMyVips().take(1),
      this.vipService.getQualifications().take(1),
    ).subscribe(([profile, myvips, qs]: [IProfile, MyVips, IVipRebateOrigin[]]) => {
      this.profile = profile;
      this.qualifications = qs;
      this.current = myvips.current;
      this.vips = myvips.items;
    });
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  get canReward() { return !!this.selected.length; }

  get canRebate() {
    return this.current && this.selected.length === 2 &&
      this.selected[0].Amount + this.selected[1].Amount > this.current.Amount * 2;
  }

  onReward() {
    if (this.canReward) {
      let payload: VipRebatePayload = {
        Type: constMap.VipRebateType['TVipRebateReward'],
        SubIDs: this.selected.map(item => item.ID),
      };
      this.moneyService.rebate(payload).subscribe(_ => this.afterRebate(false));
    }
  }

  onRebate() {
    if (this.canRebate) {
      let payload: VipRebatePayload = {
        Type: constMap.VipRebateType['TVipRebateRebate'],
        SubIDs: this.selected.map(item => item.ID),
      };
      this.moneyService.rebate(payload).subscribe(_ => this.afterRebate(true));
    }
  }

  isSelected(item: IVipRebateOrigin) { return ~this.selected.indexOf(item); }

  onSelect(item: IVipRebateOrigin) {
    let i = this.selected.indexOf(item);
    if (~i) {
      this.selected.splice(i, 1);
    } else {
      this.selected.push(item);
    }
  }

  private afterRebate(isRebate: boolean) {
    this.selected.forEach(item => {
      let i = this.qualifications.indexOf(item);
      if (~i) {
        this.qualifications.splice(i, 1);
      }
    });
    this.selected = [];
    this.current = null;
    this.vips = null;
    if (isRebate) {
      this.vipService.getMyVips().take(1).subscribe(myvips => {
        this.current = myvips.current;
        this.vips = myvips.items;
      });
    }
  }
}
