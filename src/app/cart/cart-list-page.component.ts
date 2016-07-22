import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { CartService, ICartItem } from '../core';
import { Header1Component } from '../header-bar';
import { CartItemComponent } from './cart-item.component';

@Component({
  template: require('./cart-list-page.html'),
  directives: [Header1Component, CartItemComponent],
})
export class CartListPageComponent {
  total: number = 0;
  selected: number = 0;

  private _items: ICartItem[];
  private _isAllSelected: boolean;

  constructor(
    private router: Router,
    private _location: Location,
    private service: CartService) { }

  get isAllSelected(): boolean { return this._isAllSelected; }
  set isAllSelected(checked: boolean) {
    this._isAllSelected = checked;
    this.items.forEach((item: ICartItem) => {
      item.checked = !item.invalid && checked;
    });
    this.computeTotal();
  }

  get showEmpty(): boolean {
    return this.items && !this.items.length;
  }

  get items() { return this._items; }
  set items(items: ICartItem[]) {
    this._items = items;
    this.computeTotal();
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.service.getItems().take(1).subscribe(items => this.items = items);
  }

  viewProducts() { this.router.navigate(['/products']); }

  onItemCheckedChange(item: ICartItem, checked: boolean) {
    item.checked = checked;
    this.computeTotal();
  }

  onDeleted(item: ICartItem) {
    this.service.getItems().take(1).subscribe(items => this.items = items);
  }

  onGotoCheckout() {
    if (this.selected) {
      this.router.navigate(['/checkout']);
    }
  }

  computeTotal() {
    this.total = this.service.computeTotal(this.items);
    this.selected = this.items ? this.items.filter(item => item.checked).length : 0;
  }
}
