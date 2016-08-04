import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { groupBy, keyBy, isEqual, uniq } from 'lodash';
import { URLS } from '../profile';
import { one2manyRelate, descSortor, objectToParams } from '../util';
import {
  IProductAttr, ProductAttr, ProductAttrs, IProductAttrsResponse,
  ISku, ProductAttrGroup, IProduct, IProductResponse, IProductsResponse,
  IProductQuery
} from './product';

export const O2M_PRODUCT_SKUS_OPTION = { oneId: 'ID', manyId: 'ID', oneInMany: 'Product', manyInOne: 'Skus', oneIdInMany: 'ProductID' };
export const O2M_GROUP_ATTRS_OPTION = { oneId: 'ID', manyId: 'ID', oneInMany: 'Group', manyInOne: 'Attrs', oneIdInMany: 'GroupID' };

@Injectable()
export class ProductService {

  private _attrs: Observable<ProductAttrs> = null;

  constructor(private http: Http) { }

  clearAttrsCache() { this._attrs = null; }

  getAttrs() {
    if (!this._attrs) {
      this._attrs = this.http.get(URLS.PRODUCT_ATTR_LIST).
        map((res) => this.initAttrs(<IProductAttrsResponse>res.json())).
        publishReplay(1).refCount();
    }
    return this._attrs;
  }

  findSku(Product: IProduct, Attrs: ProductAttr[]): ISku {
    return Product.Skus.find(sku => isEqual(sku.Attrs, Attrs.sort((b, a) => a.Group.Pos - b.Group.Pos).map(attr => attr.ID)));
  }

  fromCategory(categoryId: number): Observable<IProduct[]> {
    return this.getProducts(new URLSearchParams(`CategoryID=${categoryId}`));
  }

  query(query: IProductQuery): Observable<IProduct[]> {
    return this.getProducts(new URLSearchParams(objectToParams(query)));
  }

  // ?CategoryID=111
  getProducts(params: URLSearchParams): Observable<IProduct[]> {
    return this.http.get(URLS.PRODUCT_LIST, { search: params }).map(res => {
      let {Products = [], Skus = [], Attrs = []} = <IProductsResponse>res.json();
      // let ProductMap = keyBy(Products, 'ID');
      //
      // let AttrsByProduct: Dict<IProductAttr[]> = {};
      // let attrIdsBySku = groupBy(Attrs, 'SkuID');
      // Skus.forEach(sku => {
      //   // only use those can be showed
      //   let Attrs = (attrIdsBySku[sku.ID] || []).map(attrId => attrAndGroupMap.Attrs[attrId.AttrID]).filter(attr => !!attr).
      //     sort(descSortor);
      //   sku.Attrs = Attrs.map(attr => attr.ID);
      //
      //   // add all sku Attrs to ProductID
      //   let ProductAttrs = AttrsByProduct[sku.ProductID] || [];
      //   AttrsByProduct[sku.ProductID] = [...ProductAttrs, ...Attrs];
      // });
      //
      // Object.keys(AttrsByProduct).forEach(ProductId => {
      //   let Product = ProductMap[ProductId];
      //   let flattenAttrs = uniq(AttrsByProduct[ProductId]);
      //
      //   let AttrsByGroup = groupBy(flattenAttrs, 'GroupID');
      //   Product.Groups = Object.keys(AttrsByGroup).filter(groupId => groupId in attrAndGroupMap.Groups).
      //     map(groupId => new ProductAttrGroup(attrAndGroupMap.Groups[groupId], AttrsByGroup[groupId].sort(descSortor))).
      //     sort(descSortor);
      // });

      one2manyRelate(Products, Skus, O2M_PRODUCT_SKUS_OPTION);
      let attrIdsBySku = groupBy(Attrs, item => item.SkuID);
      Products.forEach(product => {
        let attrs = product.Skus.map(sku => attrIdsBySku[sku.ID]).reduce((a, b) => [...a, ...b], []);
        let skus = product.Skus;
        product.raw = { skus, attrs };
      });
      return Products;
    });
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get(URLS.Product(id)).map(res => {
      let {Product: product, Skus: skus = [], Attrs: attrs = []} = <IProductResponse>res.json();
      one2manyRelate([product], skus, O2M_PRODUCT_SKUS_OPTION);
      product.raw = { skus, attrs };
      return product;
    });
  }

  proccessSkus(product: IProduct): Observable<IProduct> {
    if (product.proccessed) {
      return Observable.of(product);
    }

    let { skus = [], attrs = []} = product.raw;
    return this.getAttrs().map(attrAndGroupMap => {
      attrs = attrs.filter(attrId => attrId.AttrID in attrAndGroupMap.Attrs);

      let flattenAttrs = attrs.map(attrId => attrAndGroupMap.Attrs[attrId.AttrID]);
      let AttrsByGroup = groupBy(uniq(flattenAttrs), item => item.GroupID);
      product.Groups = Object.keys(AttrsByGroup).filter(groupId => groupId in attrAndGroupMap.Groups).
        map(groupId => new ProductAttrGroup(attrAndGroupMap.Groups[groupId], AttrsByGroup[groupId].sort(descSortor))).
        sort(descSortor);

      let attrIdsBySku = groupBy(attrs, item => item.SkuID);
      let skuMap = keyBy(skus, item => item.ID);
      // join all Attrs
      let attrMap = keyBy(product.Groups.map(group => group.Attrs).reduce((a, b) => [...a, ...b], []), item => item.ID);
      Object.keys(attrIdsBySku).filter(id => id in skuMap).forEach(skuId => {
        // add Attrs to sku
        skuMap[skuId].Attrs = attrIdsBySku[skuId].filter(attrId => attrId.AttrID in attrMap).map(attrId => attrMap[attrId.AttrID]);
      });

      product.proccessed = true;

      return product;
    });
  }

  private initAttrs(res: IProductAttrsResponse): ProductAttrs {
    let {Groups = [], Attrs = []} = res;
    one2manyRelate(Groups, Attrs, O2M_GROUP_ATTRS_OPTION);
    return {
      Groups: keyBy(Groups, item => item.ID),
      Attrs: keyBy(Attrs, item => item.ID),
    } as ProductAttrs;
  }

}
