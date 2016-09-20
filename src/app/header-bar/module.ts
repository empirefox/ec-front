import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavMenuListModule } from '../nav-menu-list';

import { NavMenuComponent } from './nav-menu.component';
import { HeaderBarInnerComponent, HeaderBarComponent } from './header-bar.component';
import { Header1Component } from './header1.component';
import { Header1InnerComponent } from './header1-inner.component';

@NgModule({
  declarations: [
    NavMenuComponent,
    HeaderBarInnerComponent,
    HeaderBarComponent,
    Header1Component,
    Header1InnerComponent,
  ],
  imports: [
    CommonModule,
    NavMenuListModule,
  ],
  exports: [
    HeaderBarInnerComponent,
    HeaderBarComponent,
    Header1Component,
    Header1InnerComponent,
  ],
})
export class HeaderBarModule { }
