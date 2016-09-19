import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderBarModule } from '../header-bar';

import { MemberPageComponent } from './member-page.component';
import { OrderListMenuComponent } from './order-list-menu.component';
import { MoneyOverviewComponent } from './money-overview.component';

@NgModule({
  declarations: [
    MemberPageComponent,
    OrderListMenuComponent,
    MoneyOverviewComponent,
  ],
  imports: [
    CommonModule,
    HeaderBarModule,
  ],
  exports: [
    MemberPageComponent,
  ],
})
export class MemberModule { }
