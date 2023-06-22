import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

const routes: Routes = [{
  path:'profile-info',
  component:ProfileInfoComponent
},
{
  path:'manage-address',
  component:ManageAddressComponent
},
{
  path:'change-password',
  component:ChangePasswordComponent
},
{
  path:'user-orders',
  component:UserOrdersComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAccountRoutingModule { }
