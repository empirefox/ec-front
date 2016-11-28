import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  provideParent,
  CommonQuery,
  LocalProductBase, LocalProductServiceFactory, LocalProductService,
} from '../core';

@Component({
  template: `<router-outlet></router-outlet>`,
  providers: [provideParent(ProductRouteComponent, LocalProductBase)],
})
export class ProductRouteComponent implements LocalProductBase {

  local: LocalProductService;

  constructor(
    private route: ActivatedRoute,
    private localFactory: LocalProductServiceFactory) { }

  ngOnInit() {
    this.resetLocal(this.route.snapshot.queryParams);
    this.route.queryParams.subscribe(query => {
      this.resetLocal(query);
    });
  }

  resetLocal(query: CommonQuery) {
    query = Object.assign({}, query, { st: 0, sz: 30, tl: 0 });
    this.local = this.localFactory.from(query);
  }

}
