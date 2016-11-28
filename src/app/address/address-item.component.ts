import { Component, Input } from '@angular/core';
import { IAddress } from '../core';

@Component({
  selector: 'address-item',
  templateUrl: './address-item.html',
  styleUrls: ['./address-item.css'],
})
export class AddressItemComponent {

  @Input() addr: IAddress;

}
