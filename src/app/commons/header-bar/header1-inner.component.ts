import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header1-inner',
  templateUrl: './header1-inner.html',
  styleUrls: ['./header1-inner.css'],
})
export class Header1InnerComponent {

  @Output() back = new EventEmitter<any>();

  onGoBack() { this.back.next(0); }

}
