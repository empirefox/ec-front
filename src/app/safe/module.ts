import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core.module';

import { HeaderBarModule } from '../header-bar';
import { safeRouting } from './routes';

import { SafeComponent } from './safe.component';
import { PasswordComponent } from './password.component';
import { BindPhoneComponent } from './phone.component';
import { PaykeyComponent } from './paykey.component';
import { PaykeyForgetComponent } from './paykey-forget.component';
import { PaykeySetComponent } from './paykey-set.component';

@NgModule({
  declarations: [
    SafeComponent,
    PasswordComponent,
    BindPhoneComponent,
    PaykeyComponent,
    PaykeyForgetComponent,
    PaykeySetComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,

    HeaderBarModule,
    safeRouting,
  ],
  exports: [
    SafeComponent,
    PasswordComponent,
    BindPhoneComponent,
    PaykeyComponent,
    PaykeyForgetComponent,
    PaykeySetComponent,
  ],
})
export class SafeModule { }
