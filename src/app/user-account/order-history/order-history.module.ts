import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderHistoryRoutingModule } from './order-history-routing.module';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrderHistoryRoutingModule
  ],
  exports:[
OrdersComponent
  ]
})
export class OrderHistoryModule { }
