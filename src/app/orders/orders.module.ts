import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../shared/shared.module';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { OrderDetailsPageComponent } from './order-details-page/order-details-page.component';
import { OdpItemsTableComponent } from './order-details-page/odp-items-table/odp-items-table.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrdersTableComponent,
    OrderDetailsPageComponent,
    OdpItemsTableComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
