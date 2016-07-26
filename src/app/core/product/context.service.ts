import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LocalProductService, LocalProductsService } from './local.service';
import { ProductService } from './product.service';

@Injectable()
export class ProductContextService {

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private itemService: LocalProductService,
    private itemsService: LocalProductsService) { }

  asObservable() {
    return this.route.params.map(params => +params['id']).filter(id => !!id).
      flatMap(id => this.getProduct(id)).map(src => this.itemService.publish(src));
  }

  getProduct(id: number) {
    if (this.itemService.published) {
      return this.itemService.src$.take(1).flatMap(item => {
        return item && item.ID === id ? Observable.of(item) : this.getFromItemsOrRequest(id);
      });
    }
    return this.getFromItemsOrRequest(id);
  }

  private getFromItemsOrRequest(id: number) {
    if (this.itemsService.published) {
      return this.itemsService.src$.take(1).flatMap(items => {
        let item = items && items.find(item => item.ID === id);
        return item ? Observable.of(item) : this.request(id);
      });
    }
    return this.request(id);
  }

  private request(id: number) {
    return this.productService.getProduct(id);
  }

}
