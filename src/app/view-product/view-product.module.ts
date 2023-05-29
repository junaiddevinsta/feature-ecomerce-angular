import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProductRoutingModule } from './view-product-routing.module';
import { RenderViewComponent } from './render-view/render-view.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    RenderViewComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ViewProductRoutingModule
  ],
  exports:[
ProductDetailsComponent
  ],
})
export class ViewProductModule { }
