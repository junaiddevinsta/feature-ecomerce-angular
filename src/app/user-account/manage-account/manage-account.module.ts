import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAccountRoutingModule } from './manage-account-routing.module';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageAddressComponent } from './manage-address/manage-address.component';


@NgModule({
  declarations: [
    ProfileInfoComponent,
    ManageAddressComponent,

  ],
  imports: [
    CommonModule,
    ManageAccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    ProfileInfoComponent,
    ManageAddressComponent
  ]
})
export class ManageAccountModule { }
