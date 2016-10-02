import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';

import { safeRouting } from './routes';

import { SafeComponent } from './safe.component';
import { SetHeadComponent } from './head.component';
import { BindPhoneComponent } from './phone.component';
import { SetPaykeyComponent } from './paykey.component';

@NgModule({
  declarations: [
    SafeComponent,
    SetHeadComponent,
    BindPhoneComponent,
    SetPaykeyComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,

    safeRouting,
  ],
  exports: [
    SafeComponent,
    SetHeadComponent,
    BindPhoneComponent,
    SetPaykeyComponent,
  ],
})
export class SafeModule { }
