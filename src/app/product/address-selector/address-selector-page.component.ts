import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAddress, IProduct, LocalProductService } from '../../core';
import { Header1Component } from '../../header-bar';
import { AddressSelectorComponent } from '../../address';

@Component({
  template: require('./address-selector-page.html'),
  styles: [require('./address-selector-page.css')],
  directives: [Header1Component, AddressSelectorComponent],
})
export class AddressSelectorPageComponent {

  product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localProductService: LocalProductService) { }

  ngOnInit() {
    this.localProductService.src$.subscribe(product => this.product = product);
  }

  onSelected(addr: IAddress) {
    this.router.navigate(['../1', this.product.ID], { relativeTo: this.route });
  }

  gotoCreator() {
    this.router.navigate(['../new'], { relativeTo: this.route });
  }

}
