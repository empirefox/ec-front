import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { IProduct, ProductService, IProductQuery, LocalProductsService, LocalProductService } from '../../core';
import { ProductsItemComponent } from './products-item.component';

const SEARCH_COLS = ['Name', 'Intro', 'Detail'];

@Component({
  selector: 'products-page',
  template: require('./products-page.html'),
  styles: [require('./products-page.css')],
  directives: [ProductsItemComponent],
})
export class ProductsPageComponent {

  filtered: IProduct[];
  grid: boolean;

  private _filter: string;
  private _products: IProduct[] = [];

  constructor(
    private _location: Location,
    private router: Router,
    private productService: ProductService,
    private localProductService: LocalProductService,
    private localProductsService: LocalProductsService) { }

  ngOnInit() {
    let query = <IProductQuery>this.router.routerState.snapshot.queryParams;
    this.productService.query(query).subscribe(items => {
      this.products = items;
      this.localProductsService.publish(items);
    });
  }

  get togglerClass() { return this.grid ? 'browse-grid' : 'browse-list'; }
  get containerClass() { return this.grid ? 'grid' : 'list'; }

  get products() { return this._products; }
  set products(items: IProduct[]) {
    this.filtered = this._products = items;
    this.filter = '';
  }

  get filter() { return this._filter; }
  set filter(filter: string) {
    if (this._filter !== filter) {
      this._filter = filter;
      this.filtered = filter ?
        this.products.filter(product => SEARCH_COLS.some(col => !!(<string>product[col]).match(filter))) :
        this.products;
    }
  }

  onGotoProduct(product: IProduct) {
    this.localProductService.publish(product);
    this.router.navigate(['/product/1', product.ID]);
  }

  onGoBack() { this._location.back(); }

}
