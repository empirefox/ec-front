import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLS } from '../profile';
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
      this._tree = this.http.get(URLS.CATEGORY_LIST).map(res => <ICategory[]>res.json()).publishReplay(1).refCount();
    }
    return this._tree;
  }

  clearCache() {
    this._tree = null;
  }

  // TODO only used with tree data
  listToTree(list: ICategory[]): ICategory[] {
    let tree = listToTree(list, listToTreeOpts) as ICategory[];
    this.sortTreeDESC(tree);
    return tree;
  }

  private sortTreeASC(tree: ICategory[]) {
    tree.sort((a, b) => a.Pos - b.Pos);
    // tree.forEach(a => this.sortTreeASC(a.Children));
  }

  private sortTreeDESC(tree: ICategory[]) {
    tree.sort((b, a) => a.Pos - b.Pos);
    // tree.forEach(a => this.sortTreeDESC(a.Children));
  }

}
