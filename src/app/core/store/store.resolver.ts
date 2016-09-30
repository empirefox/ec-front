import { Injectable }   from '@angular/core';
import { Resolve }  from '@angular/router';
import { Observable } from "rxjs/Rx";

import { IStore } from './store';
import { StoreService } from './store.service';

@Injectable()
export class StoreResolver implements Resolve<Dict<IStore>> {

  constructor(private storeService: StoreService) { }

  resolve(): Observable<Dict<IStore>> {
    return this.storeService.getItems();
  }

}
