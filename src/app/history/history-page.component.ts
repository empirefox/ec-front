import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryItem, HistoryService } from '../core';
import { Header1Component } from '../header-bar';

@Component({
  template: require('./history-page.html'),
  styles: [require('./history-page.css')],
  directives: [Header1Component],
})
export class HistoryComponent {

  items: HistoryItem[];

  constructor(
    private router: Router,
    private historyService: HistoryService) { }

  ngOnInit() {
    this.items = this.historyService.getItems();
  }

  onGotoProducts() { this.router.navigateByUrl('/product/list'); }

  onGotoProduct(item: HistoryItem) { this.router.navigate(['/product/1', item.ProductID]); }

}
