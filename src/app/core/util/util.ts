import { isPrimitive } from '@angular/core/src/facade/lang';
import { Observable } from 'rxjs/Observable';
import { groupBy, keyBy, chain } from 'lodash';

interface Poser {
  Pos: number;
}
export function descSortor<T extends Poser>(b: T, a: T) { return a.Pos - b.Pos; }

interface IdPos extends Poser {
  ID: number;
}

// save => replace/push => copy items
export function updateAfterSave<T extends IdPos>(items: T[], item: T, copy: T): T[] {
  if (!copy.ID) {
    items = [item, ...items];
  } else {
    let i = items.findIndex(i => i.ID === copy.ID);
    if (~i) {
      items[i] = item;
    }
    items = [...items];
  }
  return items.sort(descSortor);
}

// http://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
export function nonce(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let i;
  for (i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// int SCHEMA = 2, DOMAIN = 3, PORT = 5, PATH = 6, FILE = 8, QUERYSTRING = 9, HASH = 12
// see http://stackoverflow.com/a/309360/2778814
export const urlParser = /^((http[s]?):\/)?\/?([^:\/\s]+)(:([^\/]*))?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(\?([^#]*))?(#(.*))?$/;

export function parseUrlPath(u: string) {
  return u ? u.match(urlParser)[6] : '';
}

export function toQuery(param: any) {
  return param ? Object.keys(param).map(k => `${k}=${param[k]}`).join('&') : '';
}

export function objectToParams(object) {
  return object ? Object.keys(object).map((value) => {
    let objectValue = isPrimitive(object[value]) ? object[value] : JSON.stringify(object[value]);
    return `${value}=${objectValue}`;
  }).join('&') : '';
}

// http://stackoverflow.com/a/1634841/2778814
export function removeURLParameter(url: string, parameter: string) {
  //prefer to use l.search if you have a location/link object
  let urlparts = url.split('?');
  let value: string;
  if (urlparts.length >= 2) {

    let prefix = encodeURIComponent(parameter) + '=';
    let pars = urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    let i;
    for (i = pars.length; i-- > 0;) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        value = pars[i].slice(prefix.length);
        pars.splice(i, 1);
      }
    }

    url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
  }
  return { url, value };
}

export function one2manyRelate(
  ones: Array<any>,
  manys: Array<any>,
  option?: { oneId?: string, manyId?: string, oneInMany?: string, manyInOne?: string, oneIdInMany?: string }) {

  option = option || {};
  let oneId = option.oneId || 'id';
  let manyId = option.manyId || 'id';
  let oneIdInMany = option.oneIdInMany || 'parent_id';
  let oneInMany = option.oneInMany || 'parent';
  let manyInOne = option.manyInOne || 'children';

  let oneMap = {};
  ones.forEach(one => {
    oneMap[one[oneId]] = one;
    one[manyId] = one[manyId] || [];
  });

  manys.forEach(many => {
    let one = oneMap[many[oneIdInMany]];
    if (one) {
      if (!one[manyInOne]) { one[manyInOne] = []; }
      one[manyInOne].push(many);
      many[oneInMany] = one;
    }
  });
}

export function splitToParents(
  parents: Array<any>,
  arr: Array<any>,
  option?: { idInParent?: string, parentIdInArray?: string, childrenInParent?: string }) {

  option = option || {};
  let id = option.idInParent || 'id';
  let parent = option.parentIdInArray || 'parent_id';
  let child = option.childrenInParent || 'children';

  let parentMap = {};
  parents.forEach(p => {
    parentMap[p[id]] = p;
    p[child] = p[child] || [];
  });

  arr.forEach(a => {
    let p = parentMap[a[parent]];
    if (p) {
      p[child].push(a);
    }
  });
}
