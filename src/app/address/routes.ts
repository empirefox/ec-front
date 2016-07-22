import { RouterConfig } from '@angular/router';
import { AddressManagePageComponent } from './address-manage-page.component';
import { AddressEditorPageComponent } from './address-editor-page.component';

export const routes = {
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
};
