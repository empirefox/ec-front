import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { config, ICaptcha, CaptchaService, UserService, ISetPaykeyPayload, CountdownService } from '../core';

@Component({
  templateUrl: './paykey.html',
  styleUrls: ['./paykey.css'],
})
export class SetPaykeyComponent {

  form: FormGroup;
  keyCheckControl: FormControl;
  captcha: ICaptcha;
  captchaing: boolean;
  submitting: boolean;
  error: any;

  showErr = config.showErr;

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
      Key: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      Captcha: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
      Code: ['', Validators.compose([Validators.required, Validators.pattern(`\\d{4}`)])],
    });
    this.keyCheckControl = new FormControl('');
  }

  get colding() { return this.countdownService.isSmsColding(); }

  get secondsLeft() { return this.colding ? `(${this._secondsLeft || 0}s)` : ''; }

  get valid() {
    return this.form.valid && !this.submitting && this.captcha && this.keyCheckControl.value === this.form.get('Key').value;
  }

  onSendSms() {
    if (!this.colding) {
      this.userService.preSetPaykey().subscribe(
        retry => this.countdownService.coldSms().subscribe(sec => this._secondsLeft = sec),
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
    this.error = '';
    this.submitting = true;
    let data = <ISetPaykeyPayload>this.form.value;
    data.CaptchaID = this.captcha.ID;
    data.Code = data.Code.toString();
    this.userService.setPaykey(data).subscribe(
      // need back when paying
      _ => this.location.back(),
      errRes => {
        this.onChangeCaptcha();
        this.submitting = false;
        this.error = errRes.json();
      });
  }

}
