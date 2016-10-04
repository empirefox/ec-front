import { Component, forwardRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {
  CommonQuery,
  IProduct, ProductService,
  LocalProductBase, LocalProductServiceFactory, LocalProductService,
} from '../core';

const provideParent = (component: any, parentType?: any) => {
  return { provide: parentType || LocalProductBase, useExisting: forwardRef(() => component) };
};

@Component({
  template: `<router-outlet></router-outlet>`,
  providers: [provideParent(ProductRouteComponent)],
})
export class ProductRouteComponent implements LocalProductBase {

  local: LocalProductService;

  constructor(
    private route: ActivatedRoute,
    private localFactory: LocalProductServiceFactory) { }

  ngOnInit() {
    let query = <CommonQuery>this.route.snapshot.queryParams;
    query = Object.assign({}, query, { st: 0, sz: 30, tl: 0 });
    this.local = this.localFactory.from(query);
  }

}
