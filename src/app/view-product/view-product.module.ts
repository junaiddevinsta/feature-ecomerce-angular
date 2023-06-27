import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProductRoutingModule } from './view-product-routing.module';
import { RenderViewComponent } from './render-view/render-view.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RenderViewComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ViewProductRoutingModule,
    FormsModule,
  ],
  exports:[
ProductDetailsComponent
  ],
})
export class ViewProductModule { }
