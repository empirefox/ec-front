import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { AddressManagePageComponent } from './address-manage-page.component';
import { AddressEditorPageComponent } from './address-editor-page.component';

export const routes: Routes = [
  {
    path: 'addr',
    children: [
      {
        path: '', // manage
        component: AddressManagePageComponent
      },
      {
        path: 'edit/:id',
        component: AddressEditorPageComponent,
      },
      {
        path: 'new',
        component: AddressEditorPageComponent,
      }
    ]
  }
];

export const addressRouting: ModuleWithProviders = RouterModule.forChild(routes);
