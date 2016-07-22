import { Injectable } from '@angular/core';
import { LocalPublishService } from '../local-publish';
import { IOrder } from './order';
import { ICheckout } from './checkout';

@Injectable()
export class LocalOrderService extends LocalPublishService<IOrder>{ }
@Injectable()
export class LocalOrdersService extends LocalPublishService<IOrder[]>{ }
@Injectable()
export class LocalCheckoutService extends LocalPublishService<ICheckout>{ }
