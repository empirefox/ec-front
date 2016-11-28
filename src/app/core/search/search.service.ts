import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  private _history: Dict<number> = {};
  private now = 0;

  getHistory(): string[] {
    return Object.keys(this._history).sort((b, a) => this._history[a] - this._history[b]);
  }

  addHistory(kw: string) {
    if (kw) {
      this._history[kw] = ++this.now;
    }
  }

  clear() {
    this._history = {};
    this.now = 0;
  }

}
