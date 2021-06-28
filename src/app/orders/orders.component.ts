import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderService } from '../core/services/order/order.service';
import { Order } from '../shared/models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private unsubscribe$: Subject<void>;
  // orders: Observable<Order[]>;
  orders: Order[];
  // columns = ['poNumber', 'status', 'salesRepName', 'amount'];

  constructor(private orderService: OrderService, private router: Router) {
    this.unsubscribe$ = new Subject<void>()
  }

  ngOnInit(): void {
    this.orderService.ordersList$.pipe(takeUntil(this.unsubscribe$)).subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

  orderSelected(order: Order) {
    console.log(order)
  }

  openCreateOrderDialog() {

  }

  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.next();
    }
  }
}
