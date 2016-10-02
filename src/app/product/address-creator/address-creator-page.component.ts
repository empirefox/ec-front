import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAddress, IProduct, LocalProductBase } from '../../core';

@Component({
  template: require('./address-creator-page.html'),
  styles: [require('./address-creator-page.css')],
})
export class AddressCreatorPageComponent {

  product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalProductBase) { }

  ngOnInit() {
    let id = +this.route.snapshot.data['id'];
    this.base.local.getItem(id).subscribe(product => this.product = product);
  }

  onSaved(addr: IAddress) {
    this.router.navigate(['../1', this.product.ID], { relativeTo: this.route });
  }

}
