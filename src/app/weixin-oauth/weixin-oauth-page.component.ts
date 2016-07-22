import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WxExchangeCode, WxCodeResult, Jwt, UserService } from '../core';

enum State { Init, Failed, Ok }

@Component({
  template: require('./weixin-oauth-page.html'),
})
export class WeixinOauthPageComponent {

  STATE = State;
  state: State = State.Init;

  constructor(
    private router: Router,
    private jwt: Jwt,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.exchange(<WxCodeResult>this.router.routerState.snapshot.queryParams).
      map(_ => this.state = State.Ok).subscribe(
      _ => this.router.navigateByUrl(this.jwt.getCurrentUrl()),
      _ => this.state = State.Failed
      );
  }

}
