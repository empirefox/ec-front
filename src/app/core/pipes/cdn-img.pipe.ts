import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { CDN_IMG_URL } from '../profile';

@Pipe({ name: 'cdnImg' })
export class CdnImgPipe implements PipeTransform {
  transform(value: string) {
    return !value.indexOf('https://') || !value.indexOf('http://') || !value.indexOf('//') ? value : `${CDN_IMG_URL}/${value}`;
  }
}
