import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavMenuListModule } from '../nav-menu-list';

import { FooterBarComponent } from './footer-bar.component';

@NgModule({
  declarations: [
    FooterBarComponent,
  ],
  imports: [
    CommonModule,
    NavMenuListModule,
  ],
  exports: [
    FooterBarComponent,
  ],
})
export class FooterBarModule { }
