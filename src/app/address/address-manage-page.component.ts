import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IAddress, AddressService } from '../core';
import { Header1Component } from '../header-bar';
import { AddressItemComponent } from './address-item.component';

@Component({
  selector: 'address-manage-page',
  template: require('./address-manage-page.html'),
  directives: [Header1Component, AddressItemComponent],
})
export class AddressManagePageComponent implements OnInit {

  items: IAddress[];

  constructor(
    private router: Router,
    private addressService: AddressService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.addressService.getItems().take(1).subscribe(items => this.items = items);
  }

  onGotoEdit(addr: IAddress) {
    this.router.navigate(['/addr/edit', addr.ID]);
  }

  onDel(addr: IAddress) {
    this.addressService.delete(addr.ID).subscribe(_ => this.refresh());
  }

  onCreateAddr() {
    this.router.navigate(['/addr/new']);
  }

}
