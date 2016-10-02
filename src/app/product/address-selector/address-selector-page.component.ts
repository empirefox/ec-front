import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAddress, IProduct, LocalProductBase } from '../../core';

@Component({
  template: require('./address-selector-page.html'),
  styles: [require('./address-selector-page.css')],
})
export class AddressSelectorPageComponent {

  product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalProductBase) { }

  ngOnInit() {
    let id = +this.route.snapshot.data['id'];
    this.base.local.getItem(id).subscribe(product => this.product = product);
  }

  onSelected(addr: IAddress) {
    this.router.navigate(['../1', this.product.ID], { relativeTo: this.route });
  }

  gotoCreator() {
    this.router.navigate(['../new'], { relativeTo: this.route });
  }

}
