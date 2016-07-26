import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IDeliveryDay } from '../../core';

@Component({
  selector: 'delivery-day',
  template: require('./delivery-day.html'),
  styles: [require('./delivery-day.css')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryDayComponent {

  @Input() day: IDeliveryDay;

}
