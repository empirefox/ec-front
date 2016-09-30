import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core.module';

import { HeaderBarModule } from '../header-bar';
import { RatingModule } from '../rating'; // https://github.com/pleerock/ng2-rating
import { PayModule } from '../pay';
import { orderRouting } from './routes';

import { OrderListComponent } from './order-list';
import { OrderEvalComponent } from './eval';
import { DeliveryPageComponent } from './delivery';

import { DeliveryDayComponent } from './delivery/delivery-day.component';
import { OrderActionsComponent } from './order-actions';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDetailItemComponent } from './order-detail/order-detail-item.component';
import { OrderListItemComponent } from './order-list/order-list-item.component';

@NgModule({
  declarations: [
    OrderListComponent, OrderListItemComponent,
    OrderActionsComponent, OrderDetailComponent, OrderDetailItemComponent,
    OrderEvalComponent,
    DeliveryPageComponent, DeliveryDayComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,

    HeaderBarModule,
    RatingModule,
    PayModule,
    orderRouting,
  ],
  exports: [
    OrderListComponent,
    OrderEvalComponent,
    DeliveryPageComponent,
  ],
})
export class OrderModule { }
