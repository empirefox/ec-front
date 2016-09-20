import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';

import { HeaderBarModule } from '../header-bar';

import { GroupBuyPageComponent } from './group-buy-page.component';
import { GroupBuyItemComponent } from './group-buy-item.component';

@NgModule({
  declarations: [
    GroupBuyPageComponent,
    GroupBuyItemComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,

    HeaderBarModule,
  ],
  exports: [
    GroupBuyPageComponent,
  ],
})
export class GroupbuyModule { }
