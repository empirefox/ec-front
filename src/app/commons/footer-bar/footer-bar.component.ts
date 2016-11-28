import { Component, Input } from '@angular/core';

@Component({
  selector: 'footer-bar',
  templateUrl: './footer-bar.html',
  styleUrls: ['./footer-bar.css'],
})
export class FooterBarComponent {
  @Input() show: boolean = true;

  get display() { return this.show ? 'block' : 'none'; }
}
