import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { KSSwiperModule } from 'angular2-swiper';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { MyDatePickerModule } from 'mydatepicker/src/my-date-picker/my-date-picker.module';

import { RatingModule, NavMenuListComponent, COMMONS_COMPONENTS } from './commons';

import { APP_CORE_PIPES, APP_CORE_PROVIDERS } from './core';
import { APP_DIRECTIVES } from './directives';

// TODO add components
@NgModule({
  declarations: [
    ...APP_CORE_PIPES,
    ...APP_DIRECTIVES,
    NavMenuListComponent,
    ...COMMONS_COMPONENTS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule,
    KSSwiperModule,
    InfiniteScrollModule,
    MyDatePickerModule,
    RatingModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule,
    KSSwiperModule,
    InfiniteScrollModule,
    MyDatePickerModule,
    RatingModule,
    ...APP_CORE_PIPES,
    ...APP_DIRECTIVES,
    ...COMMONS_COMPONENTS,
  ],
  providers: [
    ...APP_CORE_PROVIDERS,
  ],
})
export class CoreModule { }
