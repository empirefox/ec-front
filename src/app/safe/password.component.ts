import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../header-bar';

@Component({
  template: require('./password.html'),
  styles: [require('./password.css')],
  directives: [Header1Component],
})
export class PasswordComponent {

  constructor(private router: Router) { }

}
