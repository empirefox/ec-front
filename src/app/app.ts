import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  template: require('./app.html'),
  styles: [require('./app.css')],
  encapsulation: ViewEncapsulation.None,
})
export class App {

  constructor() { }

  ngOnInit() { }

}
