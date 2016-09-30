import { IProfile } from '../profile';
import { ICheckout } from './checkout';

export abstract class LocalCheckoutBase {
  profile: IProfile;
  checkout: ICheckout;
}
