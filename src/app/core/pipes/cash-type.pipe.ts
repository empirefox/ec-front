import { Pipe, PipeTransform } from '@angular/core';
import { constTransMap } from '../consts';

const STATES = constTransMap.UserCashType;

@Pipe({ name: 'cashType' })
export class CashTypePipe implements PipeTransform {
  transform(value: number) {
    return STATES[value] ? STATES[value] : '';
  }
}
