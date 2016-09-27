import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import sumBy from 'lodash/sumBy';
import { URLS } from '../profile';
import { one2manyRelate } from '../util';
import { IUserCash, IWallet, IWxPayArgs, WithdrawPayload, VipRebatePayload } from './money';

declare var WeixinJSBridge;

const sortor = (b: { CreatedAt: number }, a: { CreatedAt: number }) => a.CreatedAt - b.CreatedAt;
const O2M_REBATE_OPTION = { oneId: 'ID', manyId: 'ID', oneInMany: 'rebate', manyInOne: 'items', oneIdInMany: 'RebateID' };

@Injectable()
export class MoneyService {

  constructor(private http: AuthHttp) { }

  getWallet(): Observable<IWallet> {
    return this.http.get(URLS.WALLET).map(res => {
      let wallet = <IWallet>(res.json() || {});
      wallet.Cashes = wallet.Cashes || [];
      wallet.Cashes.sort(sortor);
      wallet.cash = wallet.Cashes.length ? wallet.Cashes[0].Balance : 0;

      wallet.Frozen = (wallet.Frozen || []).filter(item => !item.ThawedAt).sort(sortor);
      wallet.frozen = sumBy(wallet.Frozen, item => item.Amount);

      wallet.Rebates = (wallet.Rebates || []).filter(item => !item.DoneAt);
      wallet.RebateItems = wallet.RebateItems || [];
      one2manyRelate(wallet.Rebates, wallet.RebateItems, O2M_REBATE_OPTION);
      wallet.Rebates.sort(sortor).forEach(rebate => rebate.items.sort(sortor));
      wallet.unrebated = sumBy(wallet.Rebates, item => item.Amount) - sumBy(wallet.RebateItems, item => item.Amount);

      wallet.Points = wallet.Points || [];
      wallet.Points.sort(sortor);
      wallet.points = wallet.Points.length ? wallet.Points[0].Balance : 0;
      return wallet;
    });
  }

  requestPay(payargs: IWxPayArgs): Observable<{}> {
    return Observable.fromPromise(this._requestPay(payargs));
  }

  // WARNING! need clear cache of qualifications and wallet, then fetch again
  rebate(payload: VipRebatePayload) {
    return this.http.post(URLS.USER_REBATE, JSON.stringify(payload));
  }

  // WARNING! just add cash to top
  withdraw(amount: number): Observable<IUserCash> {
    let payload: WithdrawPayload = { Amount: amount };
    return this.http.post(URLS.USER_WITHDRAW, JSON.stringify(payload)).map(res => <IUserCash>res.json());
  }

  private _requestPay(payargs: IWxPayArgs) {
    return new Promise((resolve, reject) => {
      let onBridgeReady = () => {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          payargs,
          (res) => {
            // 使用以上方式判断前端返回,微信团队郑重提示:res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            if (res.err_msg === 'get_brand_wcpay_request：ok') {
              resolve();
            } else {
              reject();
            }
          }
        );
      };

      if (typeof WeixinJSBridge === 'undefined') {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      } else {
        onBridgeReady();
      }
    });
  }

}
