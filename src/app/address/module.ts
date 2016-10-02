import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';

import { addressRouting } from './routes';

import { AddressShortComponent } from './address-short.component';
import { AddressEditorComponent } from './address-editor.component';
import { AddressSelectorComponent } from './address-selector.component';
import { AddressItemComponent } from './address-item.component';
import { AddressManagePageComponent } from './address-manage-page.component';
import { AddressEditorPageComponent } from './address-editor-page.component';

@NgModule({
  declarations: [
    AddressShortComponent,
    AddressEditorComponent,
    AddressSelectorComponent,
    AddressItemComponent,
    AddressManagePageComponent,
    AddressEditorPageComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    addressRouting,
  ],
  exports: [
    AddressShortComponent,
    AddressEditorComponent,
    AddressSelectorComponent,
    AddressItemComponent,
    AddressManagePageComponent,
    AddressEditorPageComponent,
  ],
})
export class AddressModule { }
