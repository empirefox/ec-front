import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuantityInputComponent } from './quantity-input.component';

@NgModule({
  declarations: [
    QuantityInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    QuantityInputComponent,
  ],
})
export class QuantityInputModule { }
