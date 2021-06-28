import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrderService } from 'src/app/core/services/order/order.service';
import { Order, OrderItem } from 'src/app/shared/models/order.model';
import { StatesEnum } from 'src/app/shared/constants/state-abbreviations';

@Component({
  selector: 'app-order-details-page',
  templateUrl: './order-details-page.component.html',
  styleUrls: ['./order-details-page.component.scss']
})
export class OrderDetailsPageComponent implements OnInit {
  order: Order | Observable<Order> |undefined;
  orderItems: OrderItem[];
  orderForm: FormGroup;
  edittable = false;
  stateNames = Object.keys(StatesEnum);
  datePipeEn: DatePipe = new DatePipe('en-US')

  constructor(private route: ActivatedRoute, private orderService: OrderService, private fb: FormBuilder) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const poNumberFromRoute = routeParams.get('poNumber');
    this.order = this.orderService.fetchSpecificOrder(poNumberFromRoute)
      .pipe(
        tap(order => {
          this.fillForm(order);
        }
        )
      );
    this.orderService.fetchOrderItems(poNumberFromRoute).subscribe(
      (items: OrderItem[]) => {
        this.orderItems = items;
      }
    )
    this.orderForm = this.fb.group({
      client: [{ value: null, disabled:!this.edittable }],
      salesRepName: [{ value: null, disabled:!this.edittable }],
      poNumber: [{ value: null, disabled:!this.edittable }],
      status: [{ value: null, disabled:!this.edittable }],
      amount: [{ value: null, disabled:!this.edittable }],
      paymentTerms: [{ value: null, disabled:!this.edittable }],
      shippingNotes: [{ value: null, disabled:!this.edittable }],
      lastShippingDate: [{ value: null, disabled:!this.edittable }],

      billingReceiver: [{ value: null, disabled:!this.edittable }],
      billingAddress: [{ value: null, disabled:!this.edittable }],
      billingCity: [{ value: null, disabled:!this.edittable }],
      billingStateName: [{ value: null, disabled:!this.edittable }],
      billingPostcode: [{ value: null, disabled:!this.edittable }],
      billingEmail: [{ value: null, disabled:!this.edittable }],
      billingPhone: [{ value: null, disabled:!this.edittable }],

      shippingReceiver: [{ value: null, disabled:!this.edittable }],
      shippingAddress: [{ value: null, disabled:!this.edittable }],
      shippingCity: [{ value: null, disabled:!this.edittable }],
      shippingStateName: [{ value: null, disabled:!this.edittable }],
      shippingPostCode: [{ value: null, disabled:!this.edittable }],
      shippingEmail: [{ value: null, disabled:!this.edittable }],
      shippingPhone: [{ value: null, disabled:!this.edittable }]
    })
  }

  toggleEdit(group: FormGroup, state: boolean) {
    this.edittable = state;
    if (state) {
      for (const i in group.controls) {
        group.controls[i].enable();
      }
    } else {
      for (const i in group.controls) {
        group.controls[i].disable();
      }
      console.log(this.orderForm.value);
    }
    group.controls.poNumber.disable();
    group.controls.lastShippingDate.disable();
  }

  fillForm( order: Order ) {
    this.orderForm.patchValue(order);
    // this.orderForm.controls.lastShippingDate.patchValue(this.datePipeEn.transform(order.lastShippingDate, 'shortDate'));
  }
}
