import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { OrderService } from 'src/app/core/services/order/order.service';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() ordersList: Order[];
  @Output() orderSelected: EventEmitter<Order> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ordersService: OrderService, private router: Router) {
    this.unsubscribe$ = new Subject<void>();
  }

  dataSource: MatTableDataSource<Order>;
  displayedColumns: string[] = ['poNumber', 'client', 'amount', 'status', 'actions'];
  displayedColumnsMobile: string[] = ['poNumber', 'status', 'salesRepName', 'amount'];

  private unsubscribe$: Subject<void>;

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Order>(this.ordersList);
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectOrder(order: Order): void {
    this.orderSelected.emit(order);
  }

  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.next();
    }
  }
}
