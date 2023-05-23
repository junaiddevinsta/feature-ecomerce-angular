import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedWebsiteRoutingModule } from './shared-website-routing.module';
import { HeaderComponent } from './layout/header/header.component';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedWebsiteRoutingModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class SharedWebsiteModule { }
