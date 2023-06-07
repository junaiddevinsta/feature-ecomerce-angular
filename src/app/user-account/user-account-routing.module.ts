import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenderUserAccountComponent } from './render-user-account.component';

const routes: Routes = [{
path:'',
component:RenderUserAccountComponent,
children:[{
  path:'order-history',
  loadChildren:()=>import('./order-history/order-history.module').then((m)=>m.OrderHistoryModule)
},
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule { }
