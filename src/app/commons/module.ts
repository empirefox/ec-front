import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker/src/my-date-picker/my-date-picker.module';

import { RatingModule } from './rating'; // https://github.com/pleerock/ng2-rating

import { DateInputComponent } from './date-input';
import { FooterBarComponent } from './footer-bar';
import { NavMenuListComponent } from './nav-menu-list';
import { OrderPayComponent } from './pay';
import { QuantityInputComponent } from './quantity-input';
import {
  NavMenuComponent,
  HeaderBarInnerComponent,
  HeaderBarComponent,
  Header1Component,
  Header1InnerComponent,
} from './header-bar';

@NgModule({
  declarations: [
    NavMenuListComponent,
    DateInputComponent,
    FooterBarComponent,
    OrderPayComponent,

    NavMenuComponent,
    HeaderBarInnerComponent,
    HeaderBarComponent,
    Header1Component,
    Header1InnerComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    RatingModule,
  ],
  exports: [
    DateInputComponent,
    FooterBarComponent,
    OrderPayComponent,

    HeaderBarInnerComponent,
    HeaderBarComponent,
    Header1Component,
    Header1InnerComponent,
  ],
})
export class CommonsModule { }
