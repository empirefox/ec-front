import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { SwiperModule } from 'angular2-useful-swiper';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { MyDatePickerModule } from 'mydatepicker/src/my-date-picker/my-date-picker.module';

import { RatingModule, NavMenuListComponent, COMMONS_COMPONENTS } from './commons';

import { APP_CORE_PIPES } from './core';
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
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule,
    BootstrapModalModule,
    SwiperModule,
    InfiniteScrollModule,
    MyDatePickerModule,
    RatingModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BootstrapModalModule,
    SwiperModule,
    InfiniteScrollModule,
    MyDatePickerModule,
    RatingModule,
    ...APP_CORE_PIPES,
    ...APP_DIRECTIVES,
    ...COMMONS_COMPONENTS,
  ],
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
