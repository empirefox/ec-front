import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { HeaderBarComponent } from './header-bar.component';

@Component({
  selector: 'header1',
  template: require('./header1.html'),
  styles: [require('./header1.css')],
  directives: [HeaderBarComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header1Component { }
