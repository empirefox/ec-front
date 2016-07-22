import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

declare var countdown: any;

export interface Timespan {
  millennia?: number;
  centuries?: number;
  decades?: number;
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
  toString(emptyLabel?: string): string;
}

@Injectable()
export class CountdownService {

  sms: Subject<number>;

  isSmsColding() { return !!this.sms; }

  coldSms() {
    return this._coldSms(60);
  }

  private _coldSms(sec: number) {
    if (!this.sms) {
      this.sms = new Subject<number>();

      let timerId = countdown(
        (ts: Timespan) => this.sms.next(ts.seconds),
        new Date(Date.now() + sec * 1000),
        countdown.SECONDS);

      setTimeout(() => {
        clearInterval(timerId);
        this.sms.complete();
        this.sms = null;
      }, sec * 1000);
    }
    return this.sms;
  }

}
