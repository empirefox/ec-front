import { RouterConfig } from '@angular/router';
import { CheyouHubComponent } from './cheyou-hub.component';
import { CheyouDetailComponent } from './cheyou-detail.component';
import { CheyouBuyComponent } from './cheyou-buy.component';
import { CheyouListComponent } from './cheyou-list.component';
import { CheyouMyComponent } from './cheyou-my.component';

export const routes = {
  path: 'cheyou',
  children: [
    {
      path: '', // content
      component: CheyouHubComponent
    },
    {
      path: 'detail',
      component: CheyouDetailComponent,
    },
    {
      path: 'buy',
      component: CheyouBuyComponent,
    },
    {
      path: 'list',
      component: CheyouListComponent,
    },
    {
      path: 'my',
      component: CheyouMyComponent,
    },
  ]
};
