import { Component, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import URL from 'url-parse';
import { config, removeURLParameter, TokenService } from './core';

interface AppQueryParams {
  u?: string;
  showerr?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(
    private location: Location,
    private router: Router,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public modal: Modal,
    private tokenService: TokenService) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    let path = this.location.path();
    let query = new URL(this.location.path(), '/', true).query as AppQueryParams;
    if (query.u) {
      this.tokenService.redirectLogin().subscribe();
    }
    if (query.showerr) {
      console.log('Errors will be shown');
      this.location.replaceState(removeURLParameter(path, 'showerr').url);
      config.showErr = true;
    }
  }

}
