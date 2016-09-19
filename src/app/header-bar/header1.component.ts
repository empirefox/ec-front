import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { HeaderBarComponent } from './header-bar.component';

@Component({
  selector: 'header1',
  template: require('./header1.html'),
  styles: [require('./header1.css')],
  encapsulation: ViewEncapsulation.None,
})
export class Header1Component { }
