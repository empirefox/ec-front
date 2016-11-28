import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory, CategoryService } from '../core';

@Component({
  templateUrl: './category-page.html',
  styleUrls: ['./category-page.css'],
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
