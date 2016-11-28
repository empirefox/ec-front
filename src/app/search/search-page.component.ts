import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../core';

@Component({
  templateUrl: './search-page.html',
  styleUrls: ['./search-page.css'],
})
export class SearchPageComponent {

  keyword: string;
  history: string[];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService) { }

  ngOnInit() {
    this.refreshHistory();
    this.keyword = this.route.snapshot.queryParams['q'];
  }

  refreshHistory() {
    this.history = this.searchService.getHistory();
  }

  onGoBack() { this.location.back(); }

  onSearch(item: string) {
    this.keyword = item || this.keyword;
    this.searchService.addHistory(this.keyword);
    let params = this.keyword ? { queryParams: { q: this.keyword } } : null;
    this.router.navigate(['/product/list'], params);
  }

  onClearHistory() {
    this.searchService.clear();
    this.refreshHistory();
  }

}
