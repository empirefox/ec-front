import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderBarModule } from '../header-bar';

import { CategoryPageComponent } from './category-page.component';
import { CategoryColComponent } from './category-col.component';

@NgModule({
  declarations: [
    CategoryColComponent,
    CategoryPageComponent,
  ],
  imports: [
    CommonModule,
    HeaderBarModule,
  ],
  exports: [
    CategoryPageComponent,
  ],
})
export class CategoryModule { }
