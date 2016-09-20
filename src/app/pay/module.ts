import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core.module';

import { OrderPayComponent } from './pay.component';

@NgModule({
  declarations: [
    OrderPayComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  exports: [
    OrderPayComponent,
  ],
})
export class PayModule { }
