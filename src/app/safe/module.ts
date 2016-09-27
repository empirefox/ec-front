import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core.module';

import { HeaderBarModule } from '../header-bar';
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
    FormsModule,
    ReactiveFormsModule,
    CoreModule,

    HeaderBarModule,
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
