import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: require('./password.html'),
  styles: [require('./password.css')],
})
export class PasswordComponent {

  constructor(private router: Router) { }

}
