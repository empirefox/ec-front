import { Pipe, PipeTransform } from '@angular/core';
import { constTransMap } from '../consts';

const STATES = constTransMap.OrderState;

@Pipe({ name: 'orderState' })
export class OrderStatePipe implements PipeTransform {
  transform(value: number) {
    return STATES[value] ? STATES[value] : '';
  }
}
