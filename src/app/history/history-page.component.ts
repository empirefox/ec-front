import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryItem, HistoryService } from '../core';

@Component({
  templateUrl: './history-page.html',
  styleUrls: ['./history-page.css'],
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
