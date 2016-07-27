import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from '../core';

@Component({
  selector: 'category-col',
  template: require('./category-col.html'),
  styles: [require('./category-col.css')],
})
export class CategoryColComponent {

  @Input() category: ICategory;

  constructor(private router: Router) { }

  onGotoProducts(leaf: ICategory) {
    this.router.navigate(['/product/list'], { queryParams: { CategoryID: leaf.ID } });
  }

}
