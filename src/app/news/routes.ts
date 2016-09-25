import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail.component';

export const routes: Routes = [
  {
    path: 'news',
    children: [
      {
        path: ':id',
        component: NewsDetailComponent,
      },
      {
        path: '',
        component: NewsComponent,
      },
    ]
  },
];

export const newsRouting: ModuleWithProviders = RouterModule.forChild(routes);
