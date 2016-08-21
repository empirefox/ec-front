import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header1Component } from '../header-bar';

@Component({
  template: require('./member-qr.html'),
  styles: [require('./member-qr.css')],
  directives: [Header1Component],
})
export class MemberQrComponent {

  constructor(private router: Router) { }

}