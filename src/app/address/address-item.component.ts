import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IAddress } from '../core';

@Component({
  selector: 'address-item',
  templateUrl: './address-item.html',
  styleUrls: ['./address-item.css'],
})
export class AddressItemComponent {

  @Input() addr: IAddress;

}
