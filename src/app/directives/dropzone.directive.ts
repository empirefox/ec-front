import { Directive, Input, Output, ElementRef, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import Dropzone from 'dropzone';
import { CdnService } from '../core';

Dropzone.autoDiscover = false;
require('!!style!css!dropzone/dist/basic.css');
require('!!style!css!dropzone/dist/dropzone.css');

export interface DropzoneConfig {
  options?: DropzoneOptions;
  handlers?: any;
}

@Directive({
  selector: '[dropzone]',
  exportAs: 'dropzone',
  host: {
    '[class.dropzone]': 'true',
  },
})
export class DropzoneDirective implements OnInit, OnDestroy {
  @Input('dropzone') config: DropzoneConfig;

  @Output() success: EventEmitter<any> = new EventEmitter<any>();
  @Output() fail: EventEmitter<string> = new EventEmitter<string>();

  @Output() added: EventEmitter<any> = new EventEmitter<any>();
  @Output() removed: EventEmitter<any> = new EventEmitter<any>();

  dropzone: Dropzone;
  uptoken: string;
  key: string;

  constructor(
    private elementRef: ElementRef,
    private cdnService: CdnService) { }

  ngOnInit() {
    this.config = this.config || {};
    this.config.options = this.config.options || {
      url: 'https://up.qbox.me',
      acceptedFiles: 'image/*',
      autoProcessQueue: false,
      parallelUploads: 1,
      maxFilesize: 10,
      addRemoveLinks: true
    };
    this.config.handlers = this.config.handlers || {};

    this.dropzone = new Dropzone(this.elementRef.nativeElement, this.config.options);

    this.config.handlers.success = (file: DropzoneFile, res: any) => {
      this.dropzone.removeAllFiles();
      this.success.next(res);
    };

    this.config.handlers.addedfile = _ => this.added.next(0);
    this.config.handlers.removedfile = _ => this.removed.next(0);

    this.config.handlers.sending = (file: DropzoneFile, xhr: XMLHttpRequest, formData: FormData) => {
      if (this.uptoken) {
        formData.append('token', this.uptoken);
      }
      formData.append('key', this.key);
    };

    Object.keys(this.config.handlers || {}).forEach(event => this.dropzone.on(event, this.config.handlers[event]));
  }

  ngOnDestroy() {
    if (this.dropzone) {
      this.dropzone.destroy();
    }
  }

  upload(key: string) {
    this.cdnService.getHeadUptoken().subscribe(uptoken => {
      this.uptoken = uptoken;
      this.key = key;
      this.dropzone.processQueue();
    });
  }

}
