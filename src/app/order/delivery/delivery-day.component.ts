import { Component, Input } from '@angular/core';
import { IDeliveryDay } from '../../core';

@Component({
  selector: 'delivery-day',
  templateUrl: './delivery-day.html',
  styleUrls: ['./delivery-day.css'],
})
export class DeliveryDayComponent {

  @Input() day: IDeliveryDay;

}
