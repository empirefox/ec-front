import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { IAddress, AddressService } from '../core';
import { ChinaRegionService, RegionPair } from './china-region.service';

@Component({
  selector: 'address-editor',
  template: require('./address-editor.html'),
  styles: [require('./address-editor.css')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ChinaRegionService],
})
export class AddressEditorComponent {

  @Output() saved = new EventEmitter<IAddress>();

  failed: boolean;

  private _addr: IAddress = <IAddress>{};
  private provinces: RegionPair[];
  private _province: RegionPair;
  private _city: RegionPair;
  private _district: RegionPair;

  constructor(
    private location: Location,
    private chinaRegionService: ChinaRegionService,
    private addressService: AddressService) { }

  ngOnInit() { }

  @Input() get addr() { return this._addr; }
  set addr(addr: IAddress) {
    this._addr = JSON.parse(JSON.stringify(addr || {}));
  }

  get cities() {
    return this._province ? this.chinaRegionService.getCities(this._province[0]) : null;
  }

  get districts() {
    return (this._province && this._city) ? this.chinaRegionService.getDistricts(this._city[0]) : null;
  }

  get province() { return this._province; }
  get city() { return this._city; }
  get district() { return this._district; }

  set province(province: RegionPair) {
    if (this._province !== province) {
      this._province = province;
      this.addr.Province = province ? province[1] : null;
      this._city = null;
      this._district = null;
      this.addr.City = null;
      this.addr.District = null;
    }
  }

  set city(city: RegionPair) {
    if (this._city !== city) {
      this._city = city;
      this.addr.City = city ? city[1] : null;
      this._district = null;
      this.addr.District = null;
    }
  }

  set district(district: RegionPair) {
    if (this._district !== district) {
      this._district = district;
      this.addr.District = district ? district[1] : null;
    }
  }

  onSubmit() {
    this.addressService.save(this.addr).subscribe(
      addr => this.saved.next(addr),
      e => {
        this.failed = true;
        setTimeout(_ => this.failed = false, 1000);
      }
    );
  }

}
