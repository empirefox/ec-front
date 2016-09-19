import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IProfile, ProfileService } from '../profile';
import { IUserInfo, UserService } from '../user';
import { QrConfig } from './qr.config';

const qrgen = require('jsqrgen');

@Injectable()
export class QrService {

  private _qr: Observable<string>;

  constructor(
    private profileService: ProfileService,
    private userService: UserService) { }

  getMyQrDataURL(): Observable<string> {
    if (!this._qr) {
      this._qr = Observable.forkJoin(
        this.profileService.getProfile().take(1),
        this.userService.getUserinfo().take(1),
      ).map(([profile, info]: [IProfile, IUserInfo]) => {
        let config: any = this.getConfig();
        let { ColorOut: colorOut, ColorIn: colorIn} = config;

        let options: any = {
          data: `${location.protocol}//${location.host}?u=${info.ID}`, // TODO move to profile
          cellSize: config.CellSize,
          foreground: [
            // foreground color
            { style: config.ColorFore },
            // outer squares of the positioner
            { row: 0, rows: 7, col: 0, cols: 7, style: colorOut },
            { row: -7, rows: 7, col: 0, cols: 7, style: colorOut },
            { row: 0, rows: 7, col: -7, cols: 7, style: colorOut },
            // inner squares of the positioner
            { row: 2, rows: 3, col: 2, cols: 3, style: colorIn },
            { row: -5, rows: 3, col: 2, cols: 3, style: colorIn },
            { row: 2, rows: 3, col: -5, cols: 3, style: colorIn },
          ],
          background: config.ColorBack,
          typeNumber: config.TypeNumber,
        };
        if (profile.QrLogoUrl) {
          let image = new Image();
          image.src = profile.QrLogoUrl;
          options.logo = {
            image,
            size: config.LogoSize,
            clearEdges: config.LogoClearEdges,
            margin: config.LogoMargin,
          };
        }
        return <string>qrgen.canvas(options).toDataURL();
      }).publishReplay(1).refCount();
    }
    return this._qr;
  }

  getConfig(): QrConfig {
    return {
      TypeNumber: 1,
      CellSize: 6,
      ColorFore: '#4169e1',
      ColorBack: '#ffffff',
      ColorOut: '#cd5c5c',
      ColorIn: '#191970',
      LogoSize: 15,
      LogoClearEdges: 2,
      LogoMargin: 0,
    };
  }

}