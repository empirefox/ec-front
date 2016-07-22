import { CrossStorageClient } from 'cross-storage';
import { PUBLIC_URL, WX_LOGIN_FAILED, XSTORAGE_HUB_URL, WxExchangeCode, JWT_CONFIG, WxCodeResult } from '../app/core/share';


export class ApiClient {

  urlParams: WxCodeResult;
  storage: CrossStorageClient;

  login() {
    this.urlParams = this.parseQuery();
    this.storage = new CrossStorageClient(XSTORAGE_HUB_URL, null);
    this.storage.onConnect().then(this.validate).then(this.exchange).then(this.ok).catch(this.failed);
  }

  failed() {
    location.href = WX_LOGIN_FAILED;
  }

  ok() {
    return this.storage.get(JWT_CONFIG.currentUrlKey).
      then(path => this.storage.del(JWT_CONFIG.currentUrlKey).then(_ => path)).
      then(path => location.href = `${PUBLIC_URL}/${path}`);
  }

  // http://stackoverflow.com/a/2880929/2778814
  parseQuery() {
    let urlParams = <WxCodeResult>{};
    let matched,
      pl = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = (s) => decodeURIComponent(s.replace(pl, " ")),
      query = window.location.search.substring(1);
    while (matched = search.exec(query)) {
      urlParams[decode(matched[1])] = decode(matched[2]);
    }
    return urlParams;
  }

  validate() {
    return this.storage.get(JWT_CONFIG.oauth2StateKey).then(state => {
      // validate
      if (this.urlParams.code && this.urlParams.state && state == this.urlParams.state) {
        return this.storage.del(JWT_CONFIG.oauth2StateKey);
      }
      throw new Error();
    });
  }

  exchange() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', WxExchangeCode(this.urlParams.code), true);

      xhr.onload = _ => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this.storage.set(JWT_CONFIG.authResult, xhr.responseText);
            resolve();
          } else {
            reject();
          }
          xhr.abort();
        }
      };
      xhr.onerror = reject;

      xhr.send();
    })
  }

}
