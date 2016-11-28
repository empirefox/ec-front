import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';

import { safeRouting } from './routes';
import { PhoneRequiredGuard } from '../interfaces';

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
  providers: [
    PhoneRequiredGuard,
  ],
})
export class SafeModule { }
