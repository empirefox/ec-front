import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { ProfileResolver, UserResolver } from '../core';

import { SafeComponent } from './safe.component';
import { SetHeadComponent } from './head.component';
import { BindPhoneComponent } from './phone.component';
import { SetPaykeyComponent } from './paykey.component';

export const routes: Routes = [
  {
    path: 'safe',
    children: [
      {
        path: '',
        component: SafeComponent,
        resolve: {
          profile: ProfileResolver,
          user: UserResolver,
        },
      },
      {
        path: 'head',
        component: SetHeadComponent,
        resolve: {
          profile: ProfileResolver,
          user: UserResolver,
        },
      },
      {
        path: 'phone',
        component: BindPhoneComponent,
      },
      {
        path: 'paykey',
        component: SetPaykeyComponent,
      },
    ]
  },
];

export const safeRouting: ModuleWithProviders = RouterModule.forChild(routes);
