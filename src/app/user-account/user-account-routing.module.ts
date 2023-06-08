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
{
  path:'manage-account',
  loadChildren:()=>import('./manage-account/manage-account.module').then((m)=>m.ManageAccountModule)
}
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule { }
