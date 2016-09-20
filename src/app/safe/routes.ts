import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { SafeComponent } from './safe.component';
import { PasswordComponent } from './password.component';
import { BindPhoneComponent } from './phone.component';
import { PaykeyComponent } from './paykey.component';
import { PaykeyForgetComponent } from './paykey-forget.component';
import { PaykeySetComponent } from './paykey-set.component';

export const routes: Routes = [
  {
    path: 'safe',
    children: [
      {
        path: '', // safe
        component: SafeComponent
      },
      {
        path: 'password',
        component: PasswordComponent
      },
      {
        path: 'phone',
        component: BindPhoneComponent,
      },
      {
        path: 'paykey', // paykey
        component: PaykeyComponent,
      },
      {
        path: 'paykey-forget',
        component: PaykeyForgetComponent,
      },
      {
        path: 'paykey-set',
        component: PaykeySetComponent,
      }
    ]
  },
];

export const safeRouting: ModuleWithProviders = RouterModule.forChild(routes);
