import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { APP_CORE_PIPES, APP_CORE_PROVIDERS } from './core';
import { APP_DIRECTIVES } from './directives';

@NgModule({
  declarations: [
    ...APP_CORE_PIPES,
    ...APP_DIRECTIVES,
  ],
  imports: [
    CommonModule,
    HttpModule,
  ],
  exports: [
    ...APP_CORE_PIPES,
  ],
  providers: [
    ...APP_CORE_PROVIDERS,
  ],
})
export class CoreModule { }
