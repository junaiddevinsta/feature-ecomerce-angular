import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedUserAccountRoutingModule } from './shared-user-account-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedUserAccountRoutingModule
  ],
  exports:[
    SidebarComponent
  ]
})
export class SharedUserAccountModule { }
