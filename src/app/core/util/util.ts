import {isPrimitive} from "angular2/src/facade/lang";
import { groupBy, keyBy, chain } from 'lodash';

interface Poser {
  Pos: number;
}
export function descSortor(b: Poser, a: Poser) { return a.Pos - b.Pos; }

export function objectToParams(object) {
  return object ? Object.keys(object).map((value) => {
    let objectValue = isPrimitive(object[value]) ? object[value] : JSON.stringify(object[value]);
    return `${value}=${objectValue}`;
  }).join('&') : '';
}

// http://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
export function nonce(length) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let i;
  for (i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// int SCHEMA = 2, DOMAIN = 3, PORT = 5, PATH = 6, FILE = 8, QUERYSTRING = 9, HASH = 12
// see http://stackoverflow.com/a/309360/2778814
export const UrlParser = /^((http[s]?):\/)?\/?([^:\/\s]+)(:([^\/]*))?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(\?([^#]*))?(#(.*))?$/;

export function parseUrlPath(u: string) {
  return u ? u.match(UrlParser)[6] : '';
}

export function toQuery(param: any) {
  return param ? Object.keys(param).map(k => `${k}=${param[k]}`).join('&') : '';
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
