import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ng2-bootstrap/components/modal';
import { CoreModule } from '../core.module';

import { DateInputModule } from '../date-input';
import { HeaderBarModule } from '../header-bar';
import { cheyouRouting } from './routes';

import { CheyouHubComponent } from './cheyou-hub.component';
import { CheyouDetailComponent } from './cheyou-detail.component';
import { CheyouBuyComponent } from './cheyou-buy.component';
import { CheyouListComponent } from './cheyou-list.component';
import { CheyouMyComponent } from './cheyou-my.component';

@NgModule({
  declarations: [
    CheyouHubComponent,
    CheyouDetailComponent,
    CheyouBuyComponent,
    CheyouListComponent,
    CheyouMyComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    CoreModule,
    DateInputModule,
    HeaderBarModule,
    cheyouRouting,
  ],
  exports: [
    CheyouHubComponent,
    CheyouDetailComponent,
    CheyouBuyComponent,
    CheyouListComponent,
    CheyouMyComponent,
  ],
})
export class CheyouModule { }
