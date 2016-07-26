import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAddress, AddressService } from '../core';
import { Header1Component } from '../header-bar';
import { AddressEditorComponent } from './address-editor.component';

@Component({
  template: require('./address-editor-page.html'),
  styles: [require('./address-editor-page.css')],
  directives: [Header1Component, AddressEditorComponent],
})
export class AddressEditorPageComponent {

  addr: IAddress;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.addressService.getItem(id).take(1).subscribe(addr => this.addr = addr);
  }

  onSaved() { this.router.navigate(['/addr']); }

}
