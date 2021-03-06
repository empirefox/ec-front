import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IAddress, AddressService } from '../core';

@Component({
  selector: 'address-selector',
  templateUrl: './address-selector.html',
  styleUrls: ['./address-selector.css'],
})
export class AddressSelectorComponent implements OnInit {

  @Output() select = new EventEmitter<IAddress>();

  selected: IAddress;

  private selectedPrev: IAddress;
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
