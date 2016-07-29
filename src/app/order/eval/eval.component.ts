import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';
import { IOrder, IOrderItem, OrderContextService, OrderService } from '../../core';
import { Header1Component } from '../../header-bar';
import { RatingComponent } from '../../rating';

// sync to product service
const starTxt = ['', '差评', '中评', '中评', '好评', '好评'];

@Component({
  template: require('./eval.html'),
  styles: [require('./eval.css')],
  directives: [Header1Component, RatingComponent],
  providers: [OrderContextService],
})
export class OrderEvalComponent implements OnInit {

  order: IOrder;
  current: IOrderItem;
  form: FormGroup;

  allControl = new FormControl(true);

  private sub: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService,
    private orderContextService: OrderContextService) { }

  ngOnInit() {
    this.form = this.fb.group({
      Eval: ['', Validators.compose([Validators.required, Validators.maxLength(500), Validators.minLength(2)])],
      RateStar: ['', Validators.required],
      RateFit: ['', Validators.required],
      RateServe: ['', Validators.required],
      RateDeliver: ['', Validators.required],
    });
    this.sub = this.orderContextService.asObservable().subscribe(order => {
      this.order = order;
      this.current = this.order.Items.find(item => !item.EvalAt);
    });
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  get starTxt() { return this.current ? starTxt[this.current.RateStar || 0] : ''; }

  onSubmit() {
    if (this.allControl.value) {
      this.orderService.evalItems(this.order.ID, this.form.value).subscribe(order => {
        this.orderContextService.publish(order);
        this.router.navigate(['../../list']);
      });
    } else {
      this.orderService.evalItem(this.current.ID, this.form.value).subscribe(item => {
        let index = this.order.Items.findIndex(src => src === this.current);
        if (~index) { this.order.Items[index] = item; }
        this.router.navigate(['../../list']);
      });
    }
  }

  setCurrent(item: IOrderItem) {
    if (this.current !== item) {
      this.current = item;
      // TODO update after rc.5 released
      (<FormControl>this.form.controls['Eval']).updateValue(item.Eval);
      (<FormControl>this.form.controls['RateStar']).updateValue(item.RateStar);
      (<FormControl>this.form.controls['RateFit']).updateValue(item.RateFit);
      (<FormControl>this.form.controls['RateServe']).updateValue(item.RateServe);
      (<FormControl>this.form.controls['RateDeliver']).updateValue(item.RateDeliver);
    }
  }

}
