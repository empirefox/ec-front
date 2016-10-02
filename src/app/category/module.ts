import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';

import { CategoryPageComponent } from './category-page.component';
import { CategoryColComponent } from './category-col.component';

@NgModule({
  declarations: [
    CategoryColComponent,
    CategoryPageComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    CategoryPageComponent,
  ],
})
export class CategoryModule { }
