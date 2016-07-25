import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { DeliveryService } from './delivery.service';
import { IDelivery } from './delivery';

// https://www.kuaidi100.com/openapi/api_post.shtml
const deliveryRawData = (): any => ({
  "message": "ok", "status": "1", "state": "3", "data":
  [
    { "time": "2012-07-07 13:35:14", "context": "客户已签收" },
    { "time": "2012-07-07 09:10:10", "context": "离开 [北京石景山营业厅] 派送中，递送员[温]，电话[]" },
    { "time": "2012-07-06 19:46:38", "context": "到达 [北京石景山营业厅]" },
    { "time": "2012-07-06 15:22:32", "context": "离开 [北京石景山营业厅] 派送中，递送员[温]，电话[]" },
    { "time": "2012-07-06 15:05:00", "context": "到达 [北京石景山营业厅]" },
    { "time": "2012-07-06 13:37:52", "context": "离开 [北京_同城中转站] 发往 [北京石景山营业厅]" },
    { "time": "2012-07-06 12:54:41", "context": "到达 [北京_同城中转站]" },
    { "time": "2012-07-06 11:11:03", "context": "离开 [北京运转中心驻站班组] 发往 [北京_同城中转站]" },
    { "time": "2012-07-06 10:43:21", "context": "到达 [北京运转中心驻站班组]" },
    { "time": "2012-07-05 21:18:53", "context": "离开 [福建_厦门支公司] 发往 [北京运转中心_航空]" },
    { "time": "2012-07-05 20:07:27", "context": "已取件，到达 [福建_厦门支公司]" }
  ]
});

describe('DeliveryService', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },

    DeliveryService
  ]);


  it('should init delivery items', inject([DeliveryService], (service) => {
    let delivery = deliveryRawData() as IDelivery;
    service.initItems(delivery);
    expect(delivery.status).toBe('1');
    expect(delivery.days.length).toBe(3);
    expect(delivery.days[1].date).toBe('2012-07-06');
    expect(delivery.days[2].items.length).toBe(2);
    expect(delivery.days[2].items[0].second).toBe('21:18:53');
  }));

});
