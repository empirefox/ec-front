import { Injectable } from '@angular/core';
import { LocalPublishService } from '../local-publish';
import { IProduct, ISku } from './Product';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class LocalProductService extends LocalPublishService<IProduct> { }
@Injectable()
export class LocalProductsService extends LocalPublishService<IProduct[]> { }

@Injectable()
export class LocalSkuService extends LocalPublishService<ISku> {
  // Observable string sources
  private _openSkus = new Subject<any>();
  // Observable string streams
  openSkus$ = this._openSkus.asObservable();
  // Service message commands
  openSkus() {
    this._openSkus.next(0);
  }
}
