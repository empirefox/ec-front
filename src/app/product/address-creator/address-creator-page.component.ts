import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAddress, IProduct, LocalProductService } from '../../core';
import { Header1Component } from '../../header-bar';
import { AddressEditorComponent } from '../../address';

@Component({
  template: require('./address-creator-page.html'),
  styles: [require('./address-creator-page.css')],
  directives: [Header1Component, AddressEditorComponent],
})
export class AddressCreatorPageComponent {

  product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localProductService: LocalProductService) { }

  ngOnInit() {
    this.localProductService.src$.subscribe(product => this.product = product);
  }

  onSaved(addr: IAddress) {
    this.router.navigate(['../1', this.product.ID], { relativeTo: this.route });
  }

}
