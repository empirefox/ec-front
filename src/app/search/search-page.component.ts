import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SearchService } from '../core';

@Component({
  template: require('./search-page.html'),
  styles: [require('./search-page.css')],
})
export class SearchPageComponent {

  keyword: string;
  history: string[];

  constructor(
    private _location: Location,
    private router: Router,
    private searchService: SearchService) { }

  ngOnInit() {
    this.refreshHistory();
    this.keyword = this.router.routerState.snapshot.queryParams['q'];
  }

  refreshHistory() {
    this.history = this.searchService.getHistory();
  }

  onGoBack() { this._location.back(); }

  onSearch() {
    this.searchService.addHistory(this.keyword);
    this.router.navigate(['/product/list'], { queryParams: { q: this.keyword } });
  }

  onClearHistory() {
    this.searchService.clear();
    this.refreshHistory();
  }

}
