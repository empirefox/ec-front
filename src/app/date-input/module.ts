import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyDatePickerModule } from 'mydatepicker/src/my-date-picker/my-date-picker.module';

import { DateInputComponent } from './date-input.component';

@NgModule({
  declarations: [
    DateInputComponent,
  ],
  imports: [
    CommonModule,
    MyDatePickerModule,
  ],
  exports: [
    DateInputComponent,
  ],
})
export class DateInputModule { }
