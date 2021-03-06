import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct, ProductService, LocalProductBase } from '../../core';

const SEARCH_COLS = ['Name', 'Intro', 'Detail'];

@Component({
  templateUrl: './products-page.html',
  styleUrls: ['./products-page.css'],
})
export class ProductsPageComponent {

  filtered: IProduct[];
  grid: boolean;
  infiniteScrollDisabled: boolean;

  private _filter: string;
  private _products: IProduct[] = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalProductBase,
    private productService: ProductService) { }

  ngOnInit() {
    this.base.local.exist().subscribe(items => this.products = items);
  }

  get togglerClass() { return this.grid ? 'browse-grid' : 'browse-list'; }
  get containerClass() { return 'search-results ' + (this.grid ? 'grid' : 'list'); }

  get products() { return this._products; }
  set products(items: IProduct[]) {
    if (this._products.length === (items ? items.length : 0)) {
      this.infiniteScrollDisabled = true;
    }
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
