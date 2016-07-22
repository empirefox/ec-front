import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  template: require('./app.html'),
  encapsulation: ViewEncapsulation.None,
})
export class App {

  constructor() { }

  ngOnInit() { }

}
