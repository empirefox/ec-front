import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLS } from '../profile';
import { IWallet, IPayArgs } from './money';

declare var WeixinJSBridge;

@Injectable()
export class MoneyService {

  constructor(private http: Http) { }

  getWallet(): Observable<IWallet> {
    return this.http.get(URLS.MONEY_BALANCE).map(res => {
      let wallet = <IWallet>res.json();
      wallet.CapitalFlows = wallet.CapitalFlows || [];
      wallet.CapitalFlows.sort((b, a) => a.CreatedAt - b.CreatedAt);
      wallet.Deposit = wallet.CapitalFlows.length ? wallet.CapitalFlows[0].Balance : 0;

      wallet.PointsList = wallet.PointsList || [];
      wallet.PointsList.sort((b, a) => a.CreatedAt - b.CreatedAt);
      wallet.Points = wallet.PointsList.length ? wallet.PointsList[0].Balance : 0;
      return wallet;
    });
  }

  requestPay(payargs: IPayArgs): Observable<{}> {
    return Observable.fromPromise(this._requestPay(payargs));
  }

  private _requestPay(payargs: IPayArgs) {
    return new Promise((resolve, reject) => {
      let onBridgeReady = () => {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          payargs,
          (res) => {
            // 使用以上方式判断前端返回,微信团队郑重提示:res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            if (res.err_msg == "get_brand_wcpay_request：ok") {
              resolve();
            } else {
              reject();
            }
          }
        );
      };

      if (typeof WeixinJSBridge == "undefined") {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      } else {
        onBridgeReady();
      }
    });
  }

}
