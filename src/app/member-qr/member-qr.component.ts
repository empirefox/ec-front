import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { QrService } from '../core';

@Component({
  templateUrl: './member-qr.html',
  styleUrls: ['./member-qr.css'],
})
export class MemberQrComponent {

  constructor(
    private router: Router,
    public qrService: QrService) { }

}
