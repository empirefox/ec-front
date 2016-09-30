import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { ICaptcha, CaptchaService, UserService, ISetPaykeyPayload, CountdownService } from '../core';

function repeatValidator(o: AbstractControl) {
  return (r: AbstractControl) => {
    let err = {
      repeatError: {
        given: o.value,
        repeat: r.value,
      }
    };

    return (r.value === o.value) ? err : null;
  }
}

@Component({
  template: require('./paykey.html'),
  styles: [require('./paykey.css')],
})
export class SetPaykeyComponent {

  form: FormGroup;
  KeyCheckControl: FormControl;
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
      Key: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      Captcha: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(6)])],
      Code: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(6)])],
    });
    this.KeyCheckControl = new FormControl('', repeatValidator(this.form.controls['Key']));
  }

  get colding() { return this.countdownService.isSmsColding(); }

  get secondsLeft() { return this.colding ? `(${this._secondsLeft || 0}s)` : ''; }

  onSendSms() {
    if (!this.sending) {
      this.sending = true;
      this.userService.preSetPaykey().subscribe(
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
    let data = <ISetPaykeyPayload>this.form.value;
    data.CaptchaID = this.captcha.ID;
    this.userService.setPaykey(data).subscribe(
      // need back when paying
      _ => this.location.back(),
      errRes => {
        this.submitting = false;
        this.error = errRes.json();
      });
  }

}
