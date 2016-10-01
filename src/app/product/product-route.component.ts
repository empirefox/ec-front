import { Component } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { IProduct, ProductService, LocalProductBase } from '../core';

@Component({
  template: `<router-outlet></router-outlet>`,
})
export class ProductRouteComponent implements LocalProductBase {

  items: Observable<IProduct[]>;

  ngOnInit() {
    this.items = null;
  }

}
