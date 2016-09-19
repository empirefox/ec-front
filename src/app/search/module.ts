import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderBarModule } from '../header-bar';

import { SearchPageComponent } from './search-page.component';

@NgModule({
  declarations: [
   SearchPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderBarModule,
  ],
  exports: [
   SearchPageComponent,
  ],
})
export class SearchModule { }
