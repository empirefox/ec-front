import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLS } from '../profile';
import { descSortor } from '../util';
import { ICategory } from './category';
import { Observable } from 'rxjs/Observable';

const listToTree = require('list-to-tree-lite');
const listToTreeOpts = { idKey: 'ID', parentKey: 'ParentID' };

@Injectable()
export class CategoryService {

  private _tree: Observable<ICategory[]> = null;

  constructor(private http: Http) { }

  // default DESC
  getTree(): Observable<ICategory[]> {
    if (!this._tree) {
      this._tree = this.http.get(URLS.CATEGORY_LIST).
        map(res => this.listToTree(res.json() || [])).publishReplay(1).refCount();
    }
    return this._tree;
  }

  clearCache() {
    this._tree = null;
  }

  // TODO only used with tree data
  listToTree(list: ICategory[]): ICategory[] {
    let tree = listToTree(list, listToTreeOpts) as ICategory[];
    return tree.sort(descSortor);
  }

}
