import { Component, Input } from '@angular/core';
import { IAddress } from '../core';

@Component({
  selector: 'address-short',
  templateUrl: './address-short.html',
  styleUrls: ['./address-short.css'],
})
export class AddressShortComponent {

  @Input() addr: IAddress;

}
