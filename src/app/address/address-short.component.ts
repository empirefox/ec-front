import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IAddress } from '../core';

@Component({
  selector: 'address-short',
  template: require('./address-short.html'),
  styles: [require('./address-short.css')],
})
export class AddressShortComponent {

  @Input() addr: IAddress;

}
