import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { QuantityInputComponent } from '../quantity-input';
import { CartService, ICartItem } from '../core';

@Component({
  selector: 'cart-item',
  template: require('./cart-item.html'),
  directives: [QuantityInputComponent],
})
export class CartItemComponent implements OnInit, OnDestroy {

  @Input() item: ICartItem;

  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() deleted = new EventEmitter<any>();

  private _checked: boolean;
  private quantity$: Subject<number> = new Subject<number>();
  private sub: any;

  constructor(
    private router: Router,
    private service: CartService) { }

  @Input() get checked(): boolean { return this._checked; };
  set checked(checked: boolean) {
    if (this._checked != checked) {
      this._checked = checked;
    }
  }

  ngOnInit() {
    this.sub = this.quantity$.debounceTime(300).distinctUntilChanged().subscribe(_ => {
      this.service.saveQuantity(this.item);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSelectChanged(value: boolean) {
    this._checked = value;
    this.checkedChange.next(value);
  }

  onDelete() {
    this.service.delete(this.item.ID).subscribe(_ => this.deleted.next(0));
  }

  // TODO get stock
  onSetQuantity(q: number) {
    this.item.Quantity = q;
    this.quantity$.next(q);
  }

  onViewProduct() {
    this.router.navigate(['/product/1', this.item.Sku.ProductID]);
  }
}
