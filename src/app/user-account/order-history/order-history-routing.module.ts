import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenderUserAccountComponent } from '../render-user-account.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [{
path:'orders',
component:OrdersComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderHistoryRoutingModule { }
