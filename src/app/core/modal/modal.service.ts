import { Injectable } from '@angular/core';
import { overlayConfigFactory } from "angular2-modal";
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { IProfile } from '../profile';

@Injectable()
export class ModalService {
  constructor(private modal: Modal) { }

  alert(content: string, title: string) {
    this.modal.alert()
      .size('lg')
      .showClose(true)
      .title(title)
      .body(content).open();
  }
}