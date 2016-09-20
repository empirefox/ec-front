import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core.module';

import { HeaderBarModule } from '../header-bar';
import { RatingModule } from '../rating';
import { PayModule } from '../pay';
import { orderRouting } from './routes';

import { OrderRouteComponent } from './order-route.component';
import { OrderListComponent } from './order-list';
import { OrderDetailPageComponent } from './order-detail';
import { OrderEvalComponent } from './eval';
import { DeliveryPageComponent } from './delivery';

import { DeliveryDayComponent } from './delivery/delivery-day.component';
import { OrderActionsComponent } from './order-actions';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDetailItemComponent } from './order-detail/order-detail-item.component';
import { OrderListItemComponent } from './order-list/order-list-item.component';

@NgModule({
  declarations: [
    OrderRouteComponent,
    OrderListComponent, OrderListItemComponent,
    OrderDetailPageComponent, OrderActionsComponent, OrderDetailComponent, OrderDetailItemComponent,
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
    OrderRouteComponent,
    OrderListComponent,
    OrderDetailPageComponent,
    OrderEvalComponent,
    DeliveryPageComponent,
  ],
})
export class OrderModule { }
