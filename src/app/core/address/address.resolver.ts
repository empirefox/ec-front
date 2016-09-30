import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IAddress } from './address';
import { AddressService } from './address.service';

@Injectable()
export class AddressResolver implements Resolve<IAddress> {

  constructor(private addressService: AddressService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.addressService.getDefault();
  }
  
}
