import { Injectable } from '@angular/core';
import { region } from './china-region';

export interface RegionPair {
  0: number;
  1: string;
}
let pairs: Dict<RegionPair[]>;
Object.keys(region).forEach(r => {
  let v = region[r];
  pairs[+r] = Object.keys(v).map(k => <RegionPair>[+k, v[k]]);
});

@Injectable()
export class ChinaRegionService {

  provinces: RegionPair[] = pairs[0];

  getCities(province: number) {
    return pairs[province];
  }

  getDistricts(city: number) {
    return pairs[city];
  }

}
