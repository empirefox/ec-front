import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavMenuListComponent } from './nav-menu-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NavMenuListComponent],
  exports: [NavMenuListComponent],
})
export class NavMenuListModule { }
