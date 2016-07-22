import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IAddress } from '../core';

@Component({
  selector: 'address-item',
  template: require('./address-item.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressItemComponent {

  @Input() addr: IAddress;

}
