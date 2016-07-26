import { Component, ViewEncapsulation } from '@angular/core';
import { FooterBarComponent } from './footer-bar';

@Component({
  selector: 'app',
  template: require('./app.html'),
  styles: [require('./app.css')],
  encapsulation: ViewEncapsulation.None,
  directives: [FooterBarComponent],
})
export class App {

  constructor() { }

  ngOnInit() { }

}
