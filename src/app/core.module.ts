import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { KSSwiperModule } from 'angular2-swiper';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { MyDatePickerModule } from 'mydatepicker/src/my-date-picker/my-date-picker.module';

import { RatingModule, NavMenuListComponent, COMMONS_COMPONENTS } from './commons';

import { APP_CORE_PIPES, APP_CORE_PROVIDERS } from './core';
import { APP_DIRECTIVES } from './directives';
import { APP_CORE_INTERFACES } from './interfaces';

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
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    KSSwiperModule,
    InfiniteScrollModule,
    MyDatePickerModule,
    RatingModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BootstrapModalModule,
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
    ...APP_CORE_INTERFACES,
  ],
})
export class CoreModule { }
