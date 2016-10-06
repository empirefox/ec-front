import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { IOrder, IOrderItem, OrderService } from '../../core';

// sync to product service
const starTxt = ['', '差评', '中评', '中评', '好评', '好评'];

@Component({
  templateUrl: './eval.html',
  styleUrls: ['./eval.css'],
})
export class OrderEvalComponent implements OnInit {

  order: IOrder;
  current: IOrderItem;
  form: FormGroup;

  allControl = new FormControl(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService) { }

  ngOnInit() {
    let data = <{ order: IOrder }>this.route.snapshot.data;
    this.order = data.order;
    this.current = this.order.Items.find(item => !item.EvalAt);
    this.form = this.fb.group({
      Eval: ['', Validators.compose([Validators.required, Validators.maxLength(500), Validators.minLength(2)])],
      RateStar: ['', Validators.required],
      RateFit: ['', Validators.required],
      RateServe: ['', Validators.required],
      RateDeliver: ['', Validators.required],
    });
  }

  get starTxt() { return this.current ? starTxt[this.current.RateStar || 0] : ''; }

  onSubmit() {
    this.orderService.evalOrder(this.order, this.form.value, this.allControl.value && this.current.ID).
      subscribe(_ => this.router.navigate(['../../list'], { relativeTo: this.route }));
  }

  setCurrent(item: IOrderItem) {
    if (this.current !== item) {
      this.current = item;
      this.form.reset(item);
    }
  }

}
