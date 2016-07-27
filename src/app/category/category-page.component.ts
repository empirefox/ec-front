import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ICategory, CategoryService } from '../core';
import { HeaderBarComponent } from '../header-bar';
import { CategoryColComponent } from './category-col.component';

@Component({
  template: require('./category-page.html'),
  styles: [require('./category-page.css')],
  directives: [HeaderBarComponent, CategoryColComponent],
})
export class CategoryPageComponent {

  tree: ICategory[];
  root: ICategory;

  constructor(
    private router: Router,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getTree().subscribe(tree => {
      this.tree = tree;
      this.root = tree.length ? tree[0] : null;
    });
  }

  onGotoSearch() {
    this.router.navigateByUrl('/search');
  }

}
