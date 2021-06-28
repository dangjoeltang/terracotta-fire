import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Order, OrderItem } from 'src/app/shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersCollection: AngularFirestoreCollection = this.afs.collection<Order[]>('orders', ref => ref.limit(5));
  private ordersList = new BehaviorSubject(null);
  private order = new BehaviorSubject(null);

  public ordersList$ = this.ordersList.asObservable();
  public order$ = this.order.asObservable();


  constructor(private afs: AngularFirestore) {
    this.fetchOrders();
    console.log('constructor called');
  }
  
  fetchOrders(): void {
    this.ordersCollection.valueChanges().pipe(take(1)).subscribe(
      (orders: Order[]) => {
        this.ordersList.next(orders);
      }
    )
  }

  fetchSpecificOrder(orderPo: string) {
    const orderDoc: AngularFirestoreDocument<Order> = this.afs.doc<Order>(`orders/${orderPo}`);
    return orderDoc.valueChanges().pipe(take(1));

  }
  fetchOrderItems(orderPo: string) {
    const orderItemsSubcollection = this.afs.collection<OrderItem>(`orders/${orderPo}/orderItems`);
    return orderItemsSubcollection.valueChanges().pipe(take(1));
  }
}
