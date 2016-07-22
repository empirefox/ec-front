import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CrossStorageClient } from 'cross-storage';
import { URLS } from '../profile';


@Injectable()
export class XstorageService {

  _storage: Observable<CrossStorageClient>;

  getStorage(): Observable<CrossStorageClient> {
    if (!this._storage) {
      let storage = new CrossStorageClient(URLS.XSTORAGE_HUB_URL, null);
      this._storage = Observable.fromPromise(storage.onConnect().then(_ => storage)).publishReplay(1).refCount();
    }
    return this._storage;
  }

  disconnect() {
    return this.getStorage().map(storage => {
      storage.close();
      this._storage = null;
    });
  }

  setItem(key: string, value: any, ttl?: number) {
    return this.getStorage().flatMap(storage => Observable.fromPromise(storage.set(key, value, ttl)));
  }

  getItem(key: string): Observable<any> {
    return this.getStorage().flatMap(storage => Observable.fromPromise(storage.get(key)));
  }

  get(...key: string[]): Observable<any[]> {
    return this.getStorage().flatMap(storage => Observable.fromPromise(storage.get(...key)));
  }

  del(...key: string[]) {
    return this.getStorage().flatMap(storage => Observable.fromPromise(storage.del(...key)));
  }

  getDelItem(key: string): Observable<any> {
    return this.get(key).flatMap(v => this.del(key).map(_ => v));
  }

  getDel(...key: string[]): Observable<any[]> {
    return this.get(...key).flatMap(v => this.del(...key).map(_ => v));
  }

}
