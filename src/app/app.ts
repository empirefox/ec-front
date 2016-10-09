import { Component, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { TokenService } from './core';

@Component({
  selector: 'app',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public modal: Modal,
    private tokenService: TokenService) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    let u = this.route.snapshot.queryParams['u'];
    if (u) {
      this.tokenService.redirectLogin().subscribe();
    }
  }

}
