import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAccountRoutingModule } from './manage-account-routing.module';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';


@NgModule({
  declarations: [
    ProfileInfoComponent,
    ManageAddressComponent,
    ChangePasswordComponent,
    UserOrdersComponent,

  ],
  imports: [
    CommonModule,
    ManageAccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    ProfileInfoComponent,
    ManageAddressComponent,
    ChangePasswordComponent,
    UserOrdersComponent
  ]
})
export class ManageAccountModule { }
