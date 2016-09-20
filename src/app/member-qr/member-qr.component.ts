import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { QrService } from '../core';

@Component({
  template: require('./member-qr.html'),
  styles: [require('./member-qr.css')],
})
export class MemberQrComponent {

  constructor(
    private router: Router,
    private qrService: QrService) { }

}
