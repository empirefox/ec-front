import { Component, ChangeDetectionStrategy, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IAddress, AddressService } from '../core';
import { AddressItemComponent } from './address-item.component';

@Component({
  selector: 'address-selector',
  template: require('./address-selector.html'),
  styles: [require('./address-selector.css')],
  directives: [AddressItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressSelectorComponent implements OnInit {

  @Output() select = new EventEmitter<IAddress>();

  private selectedPrev: IAddress;
  private selected: IAddress;
  private _items: IAddress[];

  constructor(
    private router: Router,
    private addressService: AddressService) { }

  get items() { return this._items; }
  set items(items: IAddress[]) {
    this._items = items;
    this.selected = this.selected || this.items.length ? this.items[0] : null;
    this.selectedPrev = this.selected;
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.addressService.getItems().take(1).subscribe(items => this.items = items);
  }

  onSelect(addr: IAddress) {
    if (addr !== this.selected) {
      let copy = JSON.parse(JSON.stringify(addr));
      copy.pos = this.items[0].Pos + 1;
      this.addressService.save(copy).subscribe(newAddr => this.select.next(newAddr));
    } else {
      this.select.next(addr);
    }
  }

}
