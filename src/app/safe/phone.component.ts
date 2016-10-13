import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ICaptcha, CaptchaService, UserService, IBindPhonePayload, CountdownService } from '../core';

@Component({
  templateUrl: './phone.html',
  styleUrls: ['./phone.css'],
})
export class BindPhoneComponent {

  form: FormGroup;
  captcha: ICaptcha;
  sending: boolean;
  captchaing: boolean;
  submitting: boolean;
  error: any;

  private _secondsLeft = 0;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private userService: UserService,
    private countdownService: CountdownService,
    private captchaService: CaptchaService) { }

  ngOnInit() {
    this.onChangeCaptcha();
    this.form = this.fb.group({
      Phone: ['', Validators.compose([Validators.required, Validators.pattern(`1[3|4|5|7|8]\\d{9}`)])],
      Captcha: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
      Code: ['', Validators.compose([Validators.required, Validators.pattern(`\\d{4}`)])],
    });
  }

  get colding() { return this.countdownService.isSmsColding(); }

  get secondsLeft() { return this.colding ? `(${this._secondsLeft || 0}s)` : ''; }

  onSendSms() {
    let phone = this.form.get('Phone');
    if (phone.valid && !this.sending) {
      this.sending = true;
      this.userService.preBindPhone(phone.value).subscribe(
        retry => this.countdownService.coldSms().subscribe(sec => this._secondsLeft = sec),
        _ => this.sending = false,
        () => this.sending = false
      );
    }
  }

  onChangeCaptcha() {
    if (!this.captchaing) {
      this.captchaing = true;
      this.captchaService.getCaptcha().subscribe(
        captcha => this.captcha = captcha,
        _ => this.captchaing = false,
        () => this.captchaing = false
      );
    }
  }

  onSubmit() {
    this.submitting = true;
    let data = <IBindPhonePayload>this.form.value;
    data.CaptchaID = this.captcha.ID;
    data.Code = data.Code.toString();
    this.userService.bindPhone(data).subscribe(
      _ => this.location.back(),
      errRes => {
        this.submitting = false;
        this.error = errRes.json();
      });
  }

}
