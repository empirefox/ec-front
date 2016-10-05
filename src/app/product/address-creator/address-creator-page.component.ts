import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAddress, IProduct, LocalProductBase } from '../../core';

@Component({
  templateUrl: './address-creator-page.html',
  styleUrls: ['./address-creator-page.css'],
})
export class AddressCreatorPageComponent {

  product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalProductBase) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.base.local.getItem(id).subscribe(product => this.product = product);
  }

  onSaved(addr: IAddress) {
    this.router.navigate(['../../1', this.product.ID], { relativeTo: this.route });
  }

}
