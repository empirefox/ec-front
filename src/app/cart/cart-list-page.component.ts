import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, ICartItem, ProductService } from '../core';

@Component({
  templateUrl: './cart-list-page.html',
  styleUrls: ['./cart-list-page.css'],
})
export class CartListPageComponent {
  selected: number = 0;

  private _items: ICartItem[];
  private _isAllSelected: boolean;

  constructor(
    private router: Router,
    private service: CartService,
    private productService: ProductService) { }

  get isAllSelected(): boolean { return this._isAllSelected; }
  set isAllSelected(checked: boolean) {
    this._isAllSelected = checked;
    this.items.forEach((item: ICartItem) => {
      item.checked = !item.invalid && checked;
    });
    this.computeSelected();
  }

  get total() {
    return this.items ? this.service.computeTotal(this.items) : 0;
  }

  get showEmpty(): boolean {
    return this.items && !this.items.length;
  }

  get items() { return this._items; }
  set items(items: ICartItem[]) {
    this._items = items;
    this.computeSelected();
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.service.getItems().take(1).subscribe(items => this.items = items);
  }

  viewProducts() {
    this.router.navigateByUrl('/product/list');
  }

  onItemCheckedChange(item: ICartItem, checked: boolean) {
    item.checked = checked;
    this.computeSelected();
  }

  onDeleted(item: ICartItem) {
    this.service.getItems().take(1).subscribe(items => this.items = items);
  }

  onGotoCheckout() {
    if (this.selected) {
      this.router.navigate(['/checkout']);
    }
  }

  computeSelected() {
    this.selected = this.items ? this.items.filter(item => item.checked).length : 0;
  }
}
