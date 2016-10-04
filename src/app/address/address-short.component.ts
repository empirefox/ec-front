import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IAddress } from '../core';

@Component({
  selector: 'address-short',
  templateUrl: './address-short.html',
  styleUrls: ['./address-short.css'],
})
export class AddressShortComponent {

  @Input() addr: IAddress;

}
