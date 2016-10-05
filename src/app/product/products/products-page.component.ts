import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IProduct, ProductService, LocalProductBase } from '../../core';

const SEARCH_COLS = ['Name', 'Intro', 'Detail'];

@Component({
  templateUrl: './products-page.html',
  styleUrls: ['./products-page.css'],
})
export class ProductsPageComponent {

  filtered: IProduct[];
  grid: boolean;

  private _filter: string;
  private _products: IProduct[] = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalProductBase,
    private productService: ProductService) { }

  ngOnInit() {
    let query = this.route.snapshot.queryParams;
    console.log('ProductsPageComponent', query)
    this.base.local.exist().subscribe(items => this.products = items);
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

  onScroll() {
    this.base.local.nextItems().subscribe(items => this.products = items);
  }

  trackByItems(index: number, item: IProduct) { return item.ID; }

  gotoProduct(product: IProduct) {
    this.productService.setCurrent(product);
    this.router.navigate(['/product/1', product.ID]);
  }

  goBack() { this.location.back(); }

}
