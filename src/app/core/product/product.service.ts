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
import { LocalProductService, LocalProductsService } from './local.service.ts';

const O2M_PRODUCT_SKUS_OPTION = { oneInMany: 'Product', manyInOne: 'Skus', oneIdInMany: 'ProductID' };
const O2M_GROUP_ATTRS_OPTION = { oneInMany: 'Group', manyInOne: 'Attrs', oneIdInMany: 'GroupID' };

@Injectable()
export class ProductService {

  private _attrs: Observable<ProductAttrs> = null;

  constructor(private http: Http) { }

  getLocalOrRequest(id: number, itemService?: LocalProductService, itemsService?: LocalProductsService) {
    return itemsService ? itemsService.src$.flatMap(items => {
      let order = items.find(item => item.ID === id);
      return order ? Observable.of(order) : (itemService ? itemService.src$ : this.getProduct(id));
    }) : (itemService ? itemService.src$ : this.getProduct(id));
  }

  clearAttrsCache() { this._attrs = null; }

  getAttrs() {
    if (!this._attrs) {
      this._attrs = this.http.get(URLS.PRODUCT_ATTR_LIST).
        map((res) => {
          let {Groups = [], Attrs = []} = <IProductAttrsResponse>res.json();
          one2manyRelate(Groups, Attrs, O2M_GROUP_ATTRS_OPTION);
          return {
            Groups: keyBy(Groups, item => item.ID),
            Attrs: keyBy(Attrs, item => item.ID),
          } as ProductAttrs;
        }).
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
      Products.forEach(Product => {
        let Attrs = Product.Skus.map(sku => attrIdsBySku[sku.ID]).reduce((a, b) => [...a, ...b], []);
        let Skus = Product.Skus;
        Product.response = { Product, Skus, Attrs };
      });
      return Products;
    });
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get(URLS.Product(id)).map(res => {
      let {Product, Skus = [], Attrs = []} = <IProductResponse>res.json();
      one2manyRelate([Product], Skus, O2M_PRODUCT_SKUS_OPTION);
      Product.response = { Product, Skus, Attrs };
      return Product;
    });
  }

  proccessSkus(Product: IProduct): Observable<IProduct> {
    if (Product.proccessed) {
      return Observable.of(Product);
    }

    let {Skus: skus = [], Attrs: attrs = []} = Product.response;
    return this.getAttrs().map(attrAndGroupMap => {
      attrs = attrs.filter(attrId => attrId.AttrID in attrAndGroupMap.Attrs);

      let flattenAttrs = attrs.map(attrId => attrAndGroupMap.Attrs[attrId.AttrID]);
      let AttrsByGroup = groupBy(uniq(flattenAttrs), item => item.GroupID);
      Product.Groups = Object.keys(AttrsByGroup).filter(groupId => groupId in attrAndGroupMap.Groups).
        map(groupId => new ProductAttrGroup(attrAndGroupMap.Groups[groupId], AttrsByGroup[groupId].sort(descSortor))).
        sort(descSortor);

      let attrIdsBySku = groupBy(attrs, item => item.SkuID);
      let skuMap = keyBy(skus, item => item.ID);
      // join all Attrs
      let attrMap = keyBy(Product.Groups.map(group => group.Attrs).reduce((a, b) => [...a, ...b], []));
      Object.keys(attrIdsBySku).filter(id => id in skuMap).forEach(skuId => {
        // add Attrs to sku
        skuMap[skuId].Attrs = attrIdsBySku[skuId].map(attrId => attrMap[attrId.AttrID]).filter(attrs => !!attrs);
      });

      Product.proccessed = true;

      return Product;
    });
  }

}
