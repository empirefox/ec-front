import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import groupBy from 'lodash-es/groupBy';
import keyBy from 'lodash-es/keyBy';
import isEqual from 'lodash-es/isEqual';
import uniq from 'lodash-es/uniq';
import { URLS } from '../profile';
import { constMap } from '../consts';
import { toURLSearchParams, one2manyRelate, posSortor } from '../util';
import {
  ProductAttr, ProductAttrs, IProductAttrsResponse,
  ISku, ISkusResponse, ProductAttrGroup, IProduct, IProductsResponse,
  IProductQuery,
} from './product';
import { IProductEval, IEvalItem } from './eval';
import { specialPresets } from './special';

export const O2M_PRODUCT_SKUS_OPTION = { oneId: 'ID', manyId: 'ID', oneInMany: 'product', manyInOne: 'skus', oneIdInMany: 'ProductID' };
export const O2M_GROUP_ATTRS_OPTION = { oneId: 'ID', manyId: 'ID', oneInMany: 'group', manyInOne: 'attrs', oneIdInMany: 'GroupID' };

@Injectable()
export class ProductService {

  current: Observable<IProduct>;

  private _attrs: Observable<ProductAttrs> = null;

  constructor(private http: Http) { }

  clearAttrsCache() { this._attrs = null; }

  getAttrs() {
    if (!this._attrs) {
      this._attrs = this.http.get(URLS.PRODUCT_ATTR_LIST).
        map((res) => this.initAttrs(res.json() || {})).
        publishReplay(1).refCount();
    }
    return this._attrs;
  }

  getSkus(id: number) {
    return this.http.get(URLS.ProductSkus(id)).map(res => <ISkusResponse>res.json());
  }

  findSku(product: IProduct, attrs: ProductAttr[]): ISku {
    return product.skus.find(sku => isEqual(
      sku.attrs.map(attr => attr.ID).sort(),
      attrs.map(attr => attr.ID).sort(),
    ));
  }

  query(query: IProductQuery): Observable<IProduct[]> {
    return this.getProducts(toURLSearchParams(query));
  }

  // ?CategoryID=111
  getProducts(params: string | URLSearchParams): Observable<IProduct[]> {
    return this.http.get(URLS.PRODUCT_LIST, { search: params }).map(res => this.initProducts(res.json() || {}));
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get(URLS.Product(id)).map(res => {
      let r = <IProductsResponse>res.json();
      let {Products: [product]} = r;
      let skus = r.Skus || [];
      let attrs = r.Attrs || [];

      one2manyRelate([product], skus, O2M_PRODUCT_SKUS_OPTION);
      product.raw = { skus, attrs };
      return product;
    });
  }

  setCurrent(product: IProduct) {
    if (product) {
      this.current = this.proccessSkus(product).publishReplay(1).refCount();
    }
  }

  getCurrent(id: number): Observable<IProduct> {
    return this.current = (this.current || Observable.of(null)).flatMap(product => {
      return product && product.ID === id ? Observable.of(product) : this.getProduct(id);
    }).publishReplay(1).refCount();
  }

  proccessSkus(product: IProduct): Observable<IProduct> {
    return product.raw ? this._proccessSkus(product) :
      this.getSkus(product.ID).flatMap(({Skus: skus, Attrs: attrs}) => {
        product.raw = { skus, attrs };
        product.skus = skus;
        skus.forEach(item => item.product = product);
        return this._proccessSkus(product);
      });
  }

  getEvals(product: IProduct): Observable<IProductEval> {
    if (!product.evals$) {
      product.evals$ = this.http.get(URLS.ProductEvals(product.ID)).map(res => {
        let items = (<IEvalItem[]>res.json() || []).sort((b, a) => a.EvalAt - b.EvalAt);

        let good: IEvalItem[] = [];
        let common: IEvalItem[] = [];
        let bad: IEvalItem[] = [];
        let group = [good, bad, common, common, good, good]; // 5 star

        let fits: number = 0;
        let serves: number = 0;
        let delivers: number = 0;
        items.forEach(item => {
          item.RateStar = item.RateStar || 4;
          group[item.RateStar].push(item);
          fits += item.RateFit || 4.9;
          serves += item.RateServe || 4.9;
          delivers += item.RateDeliver || 4.9;
        });

        let total = items.length;
        return {
          items, good, common, bad,
          praiseOf: total ? (good.length / total) : 0,
          fit: fits ? fits / total : 0,
          serve: fits ? serves / total : 0,
          deliver: fits ? delivers / total : 0,
        };
      }).publishReplay(1).refCount();
    }
    return product.evals$;
  }

  private _proccessSkus(product: IProduct): Observable<IProduct> {
    if (product.proccessed) {
      return Observable.of(product);
    }

    let skus = product.raw.skus || [];
    let attrs = product.raw.attrs || [];
    return this.getAttrs().map(attrAndGroupMap => {
      attrs = attrs.filter(attrId => attrId.AttrID in attrAndGroupMap.attrs);

      let flattenAttrs = attrs.map(attrId => attrAndGroupMap.attrs[attrId.AttrID]);
      let attrsByGroup = groupBy(uniq(flattenAttrs), item => item.GroupID);
      product.groups = Object.keys(attrsByGroup).filter(groupId => groupId in attrAndGroupMap.groups).
        map(groupId => new ProductAttrGroup(attrAndGroupMap.groups[groupId], attrsByGroup[groupId].sort(posSortor))).
        sort(posSortor);

      let attrIdsBySku = groupBy(attrs, item => item.SkuID);
      let skuMap = keyBy(skus, item => item.ID);
      // join all Attrs
      let attrMap = keyBy(product.groups.map(group => group.Attrs).reduce((a, b) => [...a, ...b], []), item => item.ID);
      Object.keys(attrIdsBySku).filter(id => id in skuMap).forEach(skuId => {
        // add Attrs to sku
        skuMap[skuId].attrs = attrIdsBySku[skuId].filter(attrId => attrId.AttrID in attrMap).map(attrId => attrMap[attrId.AttrID]);
      });

      product.proccessed = true;

      return product;
    });
  }

  private initAttrs(res: IProductAttrsResponse): ProductAttrs {
    let Groups = res.Groups || []; // tslint:disable-line:variable-name
    let Attrs = res.Attrs || []; // tslint:disable-line:variable-name
    let Specials = res.Specials || []; // tslint:disable-line:variable-name

    one2manyRelate(Groups, Attrs, O2M_GROUP_ATTRS_OPTION);
    let specials = <Dict<string>>{};
    specialPresets.forEach(item => specials[item] = '');
    Specials.forEach(item => specials[item.Name] = `SpecialID.eq.${item.ID}`);
    return {
      groups: keyBy(Groups, item => item.ID),
      attrs: keyBy(Attrs, item => item.ID),
      specialList: Specials,
      specials,
    };
  }

  private initProducts(res: IProductsResponse): IProduct[] {
    let Products = res.Products || []; // tslint:disable-line:variable-name
    let Skus = res.Skus || []; // tslint:disable-line:variable-name
    let Attrs = res.Attrs || []; // tslint:disable-line:variable-name
    one2manyRelate(Products, Skus, O2M_PRODUCT_SKUS_OPTION);
    let attrIdsBySku = groupBy(Attrs, item => item.SkuID);
    Products.forEach(product => {
      let attrs = product.skus.map(sku => attrIdsBySku[sku.ID]).reduce((a, b) => [...a, ...b], []);
      let skus = product.skus;
      product.Vpn = product.Vpn || constMap.VpnType.TVpnNormal;
      product.raw = { skus, attrs };
    });
    return Products.filter(item => item.skus && item.skus.length);
  }

}
