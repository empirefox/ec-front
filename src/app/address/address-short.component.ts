import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IAddress } from '../core';

@Component({
  selector: 'address-short',
  template: require('./address-short.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressShortComponent {

  @Input() addr: IAddress;

}
