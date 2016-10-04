import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WxCodeResult, Jwt, UserService } from '../core';

enum State { Init, Failed, Ok }

@Component({
  templateUrl: './weixin-oauth-page.html',
  styleUrls: ['./weixin-oauth-page.css'],
})
export class WeixinOauthPageComponent {

  STATE = State;
  state: State = State.Init;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jwt: Jwt,
    private userService: UserService) { }

  ngOnInit() {
    // redirect_uri/?code=CODE&state=STATE
    this.userService.exchange(<WxCodeResult>this.route.snapshot.queryParams).
      map(_ => this.state = State.Ok).subscribe(
      _ => this.router.navigateByUrl(this.jwt.getCurrentUrl()),
      _ => this.state = State.Failed
      );
  }

}
