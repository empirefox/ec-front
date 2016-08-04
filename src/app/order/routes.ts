import { RouterConfig } from '@angular/router';
import { OrderRouteComponent } from './order-route.component';
import { OrderListComponent } from './order-list';
import { OrderDetailPageComponent } from './order-detail';
import { DeliveryPageComponent } from './delivery';

export const routes = {
  path: 'order',
  component: OrderRouteComponent,
  children: [
    {
      path: 'list',
      component: OrderListComponent
    },
    {
      path: 'detail/:id',
      component: OrderDetailPageComponent,
    },
    {
      path: 'delivery/:id',
      component: DeliveryPageComponent,
    }
  ]
};
