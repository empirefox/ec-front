import { Component } from '@angular/core';

import { QrService } from '../core';

@Component({
  templateUrl: './member-qr.html',
  styleUrls: ['./member-qr.css'],
})
export class MemberQrComponent {

  constructor(public qrService: QrService) { }

}
