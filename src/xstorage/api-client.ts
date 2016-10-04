import { CrossStorageClient } from 'cross-storage';
import { config, WxCodeResult } from '../app/core/share';


export class ApiClient {

  urlParams: WxCodeResult;
  storage: CrossStorageClient;

  login() {
    this.urlParams = this.parseQuery();
    this.storage = new CrossStorageClient(config.xstorageHubUrl, null);
    this.storage.onConnect().then(this.validate).then(this.exchange).then(this.ok).catch(this.failed);
  }

  failed() {
    location.href = config.wxLoginFailedUrl;
  }

  ok() {
    return this.storage.get(config.jwt.currentUrlKey).
      then(path => this.storage.del(config.jwt.currentUrlKey).then(_ => path)).
      then(path => location.href = `${config.publicOrigin}/${path}`);
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
    return this.storage.get(config.jwt.oauth2StateKey).then(state => {
      // validate
      if (this.urlParams.code && this.urlParams.state && state == this.urlParams.state) {
        return this.storage.del(config.jwt.oauth2StateKey);
      }
      throw new Error();
    });
  }

  exchange() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', config.wxExchangeCode(this.urlParams.code), true);

      xhr.onload = _ => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this.storage.set(config.jwt.authResult, xhr.responseText);
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
