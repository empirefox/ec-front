import { DateInputComponent } from './date-input';
import { FooterBarComponent } from './footer-bar';
import { OrderPayComponent } from './pay';
import { QuantityInputComponent } from './quantity-input';
import {
  NavMenuComponent,
  HeaderBarInnerComponent,
  HeaderBarComponent,
  Header1Component,
  Header1InnerComponent,
} from './header-bar';

export { RatingModule } from './rating';

export * from './nav-menu-list';
export * from './date-input';
export * from './footer-bar';
export * from './header-bar';
export * from './pay';
export * from './quantity-input';
export * from './rating';

export const COMMONS_COMPONENTS = [
  DateInputComponent,
  FooterBarComponent,
  OrderPayComponent,
  QuantityInputComponent,

  NavMenuComponent,
  HeaderBarInnerComponent,
  HeaderBarComponent,
  Header1Component,
  Header1InnerComponent,
]