import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class LocalPublishService<T> {
  // Observable string sources
  private source = new Subject<T>();
  private confirmedSource = new Subject<T>();
  published: boolean;
  // Observable string streams
  src$ = this.source.publishReplay(1).refCount();
  srcConfirmed$ = this.confirmedSource.asObservable();
  // Service message commands
  publish(src: T) {
    this.published = true;
    this.source.next(src);
    return src;
  }
  publishIfNotNull(src: T) {
    if (src) {
      this.publish(src);
    }
  }
  comfirm(src: T) {
    this.confirmedSource.next(src);
  }
}
